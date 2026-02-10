import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getPool } from '@/lib/db';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ user: null });
  }

  const pool = getPool();
  const client = await pool.connect();

  try {
    const res = await client.query(
      'SELECT id, name, service_id FROM users WHERE id = $1',
      [session.userId],
    );

    if (res.rowCount === 0) return NextResponse.json({ user: null });

    const user = res.rows[0];
    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name || user.service_id,
        serviceId: user.service_id,
      },
    });
  } finally {
    client.release();
  }
}
