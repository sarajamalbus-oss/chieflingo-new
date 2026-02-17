"use server";

import { and, eq } from "drizzle-orm";
import { getCourseById, getUserProgress, getUserSubscription } from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db/drizzle";
import { revalidatePath } from "next/cache";
import { POINTS_TO_REFILL } from "@/constants";

export const reduceHearts = async (challengId: number) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengId),
  });
  if (!challenge) throw new Error("Challenge not found");

  const lessonId = challenge.lessonId;
  const currentUserProgress = await getUserProgress();
  const currentUserSubscription = await getUserSubscription();

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengId)
    ),
  });

  const isPractice = !!existingChallengeProgress;
  if (isPractice) return { error: "practice" };
  if (!currentUserProgress) throw new Error("User Progress not found");

  if (!currentUserSubscription?.isActive) {
    return { error: "subscription" };
  }

  if (currentUserProgress.hearts === 0) return { error: "hearts" };

  await db.update(userProgress).set({
    hearts: Math.max(currentUserProgress.hearts - 1, 0),
  }).where(eq(userProgress.userId, userId));

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson/${lessonId}`);
};

export const refillHearts = async () => {
  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress) throw new Error("User progress not found");

  if (currentUserProgress.hearts === 5) throw new Error("Hearts are already full");

  if (currentUserProgress.points < POINTS_TO_REFILL) throw new Error("Not enough points");

  await db.update(userProgress).set({
    hearts: 5,
    points: currentUserProgress.points - POINTS_TO_REFILL,
  }).where(eq(userProgress.userId, currentUserProgress.userId));

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
};