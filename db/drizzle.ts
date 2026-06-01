import { neonConfig, Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "@/db/schema";
import ws from "ws";

neonConfig.webSocketConstructor = ws;
neonConfig.poolQueryViaFetch = true; // ← ضيف السطر ده

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 1, // ← وده
});

export const db = drizzle(pool, { schema });