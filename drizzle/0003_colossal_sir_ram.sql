ALTER TABLE "user_subscription" DROP CONSTRAINT "user_subscription_stripe_customer_id_unique";--> statement-breakpoint
ALTER TABLE "user_subscription" DROP CONSTRAINT "user_subscription_stripe_subscription_id_unique";--> statement-breakpoint
ALTER TABLE "user_subscription" ALTER COLUMN "is_active" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user_subscription" ALTER COLUMN "stripe_customer_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user_subscription" ALTER COLUMN "stripe_subscription_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user_subscription" ALTER COLUMN "stripe_price_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user_subscription" ALTER COLUMN "stripe_current_period_end" DROP NOT NULL;