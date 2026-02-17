import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    await Promise.all([
      db.delete(schema.userProgress),
      db.delete(schema.challengeOptions),
      db.delete(schema.challengeProgress),
      db.delete(schema.challenges),
      db.delete(schema.lessons),
      db.delete(schema.units),
      db.delete(schema.courses),
      db.delete(schema.userSubscription),
    ]);

    const courses = await db
      .insert(schema.courses)
      .values([{ title: "English", imageSrc: "/flag.png" }])
      .returning();

    for (const course of courses) {
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: course.id,
            title: "Unit 1",
            description: `Learn the basics of ${course.title}`,
            order: 1,
          },
          {
            courseId: course.id,
            title: "Unit 2",
            description: `Learn intermediate ${course.title}`,
            order: 2,
          },
        ])
        .returning();

      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Nouns", order: 1 },
            { unitId: unit.id, title: "Verbs", order: 2 },
            { unitId: unit.id, title: "Adjectives", order: 3 },
            { unitId: unit.id, title: "Sentences", order: 4 },
          ])
          .returning();

        for (const lesson of lessons) {
          const challenges = await db
            .insert(schema.challenges)
            .values([
              { lessonId: lesson.id, type: "SELECT", questions: 'أي من هذه الإختيارات هي "رجل؟"',  order: 1 },
              { lessonId: lesson.id, type: "SELECT", questions: 'أي من هذه الإختيارات هي "امرأة؟"', order: 2 },
              { lessonId: lesson.id, type: "SELECT", questions: 'أي من هذه الإختيارات هي "ولد؟"',  order: 3 },
              { lessonId: lesson.id, type: "ASSIST", questions: "رجل",                               order: 4 },
              { lessonId: lesson.id, type: "SELECT", questions: 'أي من هذه الإختيارات هي "كرة؟"',  order: 5 },
              { lessonId: lesson.id, type: "SELECT", questions: 'أي من هذه الإختيارات هي "روبوت؟"', order: 6 },
              { lessonId: lesson.id, type: "SELECT", questions: 'أي من هذه الإختيارات هي "بنت؟"',  order: 7 },
              { lessonId: lesson.id, type: "ASSIST", questions: "كرة",                               order: 8 },
            ])
            .returning();

          for (const challenge of challenges) {
            if (challenge.order === 1) {
              await db.insert(schema.challengeOptions).values([
                { challengeId: challenge.id, correct: true,  text: "man",   imageSrc: "/man.jpg",   audioSrc: "/man_a.mp3" },
                { challengeId: challenge.id, correct: false, text: "woman", imageSrc: "/woman.jpg", audioSrc: "/woman_a.mp3" },
                { challengeId: challenge.id, correct: false, text: "robot", imageSrc: "/robot.jpg", audioSrc: "/robot_a.mp3" },
              ]);
            }

            if (challenge.order === 2) {
              await db.insert(schema.challengeOptions).values([
                { challengeId: challenge.id, correct: true,  text: "woman", imageSrc: "/woman.jpg", audioSrc: "/woman_a.mp3" },
                { challengeId: challenge.id, correct: false, text: "man",   imageSrc: "/man.jpg",   audioSrc: "/man_a.mp3" },
                { challengeId: challenge.id, correct: false, text: "robot", imageSrc: "/robot.jpg", audioSrc: "/robot_a.mp3" },
              ]);
            }

            if (challenge.order === 3) {
              await db.insert(schema.challengeOptions).values([
                { challengeId: challenge.id, correct: false, text: "man",   imageSrc: "/man.jpg",   audioSrc: "/man_a.mp3" },
                { challengeId: challenge.id, correct: false, text: "woman", imageSrc: "/woman.jpg", audioSrc: "/woman_a.mp3" },
                { challengeId: challenge.id, correct: true,  text: "boy",   imageSrc: "/boy.png",   audioSrc: "/boy_a.mp3" },
              ]);
            }

            if (challenge.order === 4) {
              await db.insert(schema.challengeOptions).values([
                { challengeId: challenge.id, correct: true,  text: "man",   imageSrc: "/man.jpg",   audioSrc: "/man_a.mp3" },
                { challengeId: challenge.id, correct: false, text: "woman", imageSrc: "/woman.jpg", audioSrc: "/woman_a.mp3" },
                { challengeId: challenge.id, correct: false, text: "robot", imageSrc: "/robot.jpg", audioSrc: "/robot_a.mp3" },
              ]);
            }

            if (challenge.order === 5) {
              await db.insert(schema.challengeOptions).values([
                { challengeId: challenge.id, correct: false, text: "man",   imageSrc: "/man.jpg",   audioSrc: "/man_a.mp3" },
                { challengeId: challenge.id, correct: false, text: "woman", imageSrc: "/woman.jpg", audioSrc: "/woman_a.mp3" },
                { challengeId: challenge.id, correct: true,  text: "ball",  imageSrc: "/ball.png",  audioSrc: "/ball_a.mp3" },
              ]);
            }

            if (challenge.order === 6) {
              await db.insert(schema.challengeOptions).values([
                { challengeId: challenge.id, correct: false, text: "boy",   imageSrc: "/boy.png",   audioSrc: "/boy_a.mp3" },
                { challengeId: challenge.id, correct: true,  text: "robot", imageSrc: "/robot.jpg", audioSrc: "/robot_a.mp3" },
                { challengeId: challenge.id, correct: false, text: "ball",  imageSrc: "/ball.png",  audioSrc: "/ball_a.mp3" },
              ]);
            }

            if (challenge.order === 7) {
              await db.insert(schema.challengeOptions).values([
                { challengeId: challenge.id, correct: true,  text: "girl",  imageSrc: "/girl.png",  audioSrc: "/girl_a.mp3" },
                { challengeId: challenge.id, correct: false, text: "robot", imageSrc: "/robot.jpg", audioSrc: "/robot_a.mp3" },
                { challengeId: challenge.id, correct: false, text: "boy",   imageSrc: "/boy.png",   audioSrc: "/boy_a.mp3" },
              ]);
            }

            if (challenge.order === 8) {
              await db.insert(schema.challengeOptions).values([
                { challengeId: challenge.id, correct: false, text: "woman", imageSrc: "/woman.jpg", audioSrc: "/woman_a.mp3" },
                { challengeId: challenge.id, correct: true,  text: "ball",  imageSrc: "/ball.png",  audioSrc: "/ball_a.mp3" },
                { challengeId: challenge.id, correct: false, text: "boy",   imageSrc: "/boy.png",   audioSrc: "/boy_a.mp3" },
              ]);
            }
          }
        }
      }
    }

    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();