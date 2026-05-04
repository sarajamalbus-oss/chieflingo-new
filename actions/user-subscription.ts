"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db/drizzle";
import { userSubscription } from "@/db/schema";
import { getUserSubscription } from "@/db/queries";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

export const createStripeUrl = async () => {

   console.log("STRIPE_KEY:", process.env.STRIPE_SECRET_KEY);
  console.log("PRICE_ID:", process.env.STRIPE_PRICE_ID);
  
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const userSub = await getUserSubscription();

  // لو عنده subscription فعال، افتحله بوابة الإدارة
  if (userSub?.isActive && userSub.stripeCustomerId) {
    const session = await stripe.billingPortal.sessions.create({
      customer: userSub.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/shop`,
    });
    return { data: session.url };
  }

  // اعمل checkout session جديدة
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/shop?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/shop`,
    metadata: { userId },
  });

  return { data: session.url };
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