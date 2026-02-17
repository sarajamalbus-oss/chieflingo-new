"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { getUserSubscription } from "@/db/queries";

const returnUrl = absoluteUrl("/shop");

export const createStripeUrl = async () => {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
        throw new Error("Unauthorized");
    }

    // 🔒 حل نهائي لخطأ userId
    const safeUserId = userId as string;

    const userSubscription = await getUserSubscription();

    if (userSubscription?.stripeCustomerId) {
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: userSubscription.stripeCustomerId,
            return_url: returnUrl,
        });

        return { data: portalSession.url };
    }

    const checkoutSession = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
            {
                price: process.env.STRIPE_PRICE_ID as string,
                quantity: 1,
            },
        ],
        metadata: {
            userId: safeUserId,
        },
        success_url: returnUrl,
        cancel_url: returnUrl,
    });

    return { data: checkoutSession.url };
};