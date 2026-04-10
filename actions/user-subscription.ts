"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db/drizzle";
import { userSubscription } from "@/db/schema";
import { getUserSubscription } from "@/db/queries";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const DAY_IN_MS = 86_400_000;

export const createStripeUrl = async () => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const userSub = await getUserSubscription();

  // لو عنده subscription فعال، رجّع null
  if (userSub?.isActive) {
    return { data: null };
  }

  // لو مش هتستخدم Stripe دلوقتي
  return { data: null };
};

export const cancelSubscription = async () => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  await db
    .update(userSubscription)
    .set({ isActive: false })
    .where(eq(userSubscription.userId, userId));

  revalidatePath("/shop");
  revalidatePath("/learn");
};