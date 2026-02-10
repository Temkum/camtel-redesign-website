import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const SECRET = process.env.JWT_SECRET!;

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(hash: string, password: string) {
  // Normalize bcrypt hashes (convert $2y$ to $2b$ for bcryptjs) [cite: 19, 21]
  const normalizedHash = hash.replace(/^\$2y\$/, '$2b$');
  return bcrypt.compare(password, normalizedHash); // [cite: 57]
}

export function createToken(userId: string, serviceId: number) {
  return jwt.sign({ userId, serviceId }, SECRET, { expiresIn: '7d' });
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, SECRET) as { userId: string; serviceId: number };
  } catch {
    return null;
  }
}

export function setSessionCookie(response: NextResponse, token: string) {
  response.cookies.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days [cite: 61]
    path: '/',
  });
}

export async function clearSessionCookie() {
  (await cookies()).delete('auth_token');
}
