// src/db/index.ts  (أو الملف اللي عندك)

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";  // لو عايز تستخدم schema

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql, { schema });  // أو drizzle(sql) لو مش عايز schema