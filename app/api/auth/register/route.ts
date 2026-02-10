import { NextRequest, NextResponse } from 'next/server';
import { getPool } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { z } from 'zod';

const schema = z.object({
  serviceId: z.string().min(9).max(9),
  password: z.string().min(6),
  email: z.string().email().optional(),
  fullName: z.string().min(2).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const pool = getPool();
    const client = await pool.connect();

    try {
      // Check existing
      const existing = await client.query(
        'SELECT id FROM users WHERE service_id = $1 OR (email IS NOT NULL AND email = $2)',
        [data.serviceId, data.email || null]
      );

      if (existing) {
        return NextResponse.json(
          { message: 'Service ID or email already exists' },
          { status: 400 }
        );
      }

      const hash = await hashPassword(data.password);

      await client.query(
        'INSERT INTO users (service_id, email, name, password_hash) VALUES ($1, $2, $3, $4)',
        [data.serviceId, data.email || null, data.fullName || null, hash]
      );

      return NextResponse.json({ message: 'User created' }, { status: 201 });
    } finally {
      client.release();
    }
  } catch (e: any) {
    return NextResponse.json(
      { message: e.message || 'Failed' },
      { status: 400 }
    );
  }
}
