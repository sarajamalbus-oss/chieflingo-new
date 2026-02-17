CREATE TABLE "user_subscription" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"stripe_customer_id" text NOT NULL,
	"stripe_subscription_id" text NOT NULL,
	"stripe_price_id" text NOT NULL,
	"stripe_current_period_end" timestamp NOT NULL,
	CONSTRAINT "user_subscription_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "user_subscription_stripe_customer_id_unique" UNIQUE("stripe_customer_id"),
	CONSTRAINT "user_subscription_stripe_subscription_id_unique" UNIQUE("stripe_subscription_id")
);
--> statement-breakpoint
ALTER TABLE "challengeOptions" RENAME TO "challenge_options";--> statement-breakpoint
ALTER TABLE "challengeProgress" RENAME TO "challenge_progress";--> statement-breakpoint
ALTER TABLE "challenge_options" DROP CONSTRAINT "challengeOptions_challenge_id_challenges_id_fk";
--> statement-breakpoint
ALTER TABLE "challenge_progress" DROP CONSTRAINT "challengeProgress_challenge_id_challenges_id_fk";
--> statement-breakpoint
ALTER TABLE "challenges" ADD COLUMN "image_src" text;--> statement-breakpoint
ALTER TABLE "challenges" ADD COLUMN "audio_src" text;--> statement-breakpoint
ALTER TABLE "challenge_options" ADD CONSTRAINT "challenge_options_challenge_id_challenges_id_fk" FOREIGN KEY ("challenge_id") REFERENCES "public"."challenges"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "challenge_progress" ADD CONSTRAINT "challenge_progress_challenge_id_challenges_id_fk" FOREIGN KEY ("challenge_id") REFERENCES "public"."challenges"("id") ON DELETE cascade ON UPDATE no action;