import { NextRequest, NextResponse } from 'next/server';
import { getPool } from '@/lib/db';
import { verifyPassword, createToken, setSessionCookie } from '@/lib/auth';
import { loginSchema } from '@/lib/validations/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validationResult = loginSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { message: 'Invalid input', errors: validationResult.error.issues },
        { status: 400 },
      );
    }

    const { serviceId, password } = validationResult.data;
    const serviceIdNumber = parseInt(serviceId, 10);

    const pool = getPool();
    const client = await pool.connect();

    try {
      const res = await client.query(
        'SELECT id, password_hash FROM users WHERE service_number = $1',
        [serviceIdNumber],
      );

      if (res.rowCount === 0) {
        return NextResponse.json(
          { message: 'Invalid credentials' },
          { status: 401 },
        );
      }

      const user = res.rows[0];
      const match = await verifyPassword(user.password_hash, password);

      if (!match) {
        return NextResponse.json(
          { message: 'Invalid credentials' },
          { status: 401 },
        );
      }

      const token = createToken(user.id, serviceIdNumber);

      // 1. Create the response object
      const response = NextResponse.json({ message: 'Logged in' });

      // 2. Attach cookie to the response
      setSessionCookie(response, token);

      return response;
    } finally {
      client.release();
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
