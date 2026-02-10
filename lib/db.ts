import { Pool } from '@neondatabase/serverless';

export function getPool() {
  return new Pool({
    connectionString: process.env.DATABASE_URL!,
    ssl: { rejectUnauthorized: false },
  });
}
