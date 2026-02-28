import { Pool } from '@neondatabase/serverless';

export const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  ssl: { rejectUnauthorized: false },
});
