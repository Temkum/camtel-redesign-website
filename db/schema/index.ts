/**
 * db/index.ts
 *
 * Single Drizzle client shared across the app.
 *
 * - Local dev:  uses `postgres` (node-postgres compatible driver via postgres.js)
 * - Production: swap to @neondatabase/serverless or keep postgres.js — both work.
 *
 * Install: pnpm add drizzle-orm postgres
 * Install dev: pnpm add -D drizzle-kit
 */

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './auth-schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

// In serverless (Vercel Edge / Next.js Route Handlers), `postgres` handles
// connection pooling via the driver internally. For long-lived Node servers,
// set max: N to control pool size.
const client = postgres(process.env.DATABASE_URL, {
  max: process.env.NODE_ENV === 'production' ? 10 : 1,
  ssl: process.env.NODE_ENV === 'production' ? 'require' : false,
});

export const db = drizzle(client, { schema });
