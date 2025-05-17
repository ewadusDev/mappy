import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as Minio from "minio";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);

export const minioClient = new Minio.Client({
  endPoint: String(process.env.MINIO_ENPOINT),
  port: Number(process.env.MINIO_PORT),
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECREY_KEY,
});
