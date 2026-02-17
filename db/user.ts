// db/user.ts
import { db } from "@/db/drizzle";
import { userProgress } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUser(userId: string) {
  if (!userId) throw new Error("userId is required");

  const user = await db
    .select()
    .from(userProgress)
    .where(eq(userProgress.userId, userId));

  return user[0] || null;
}