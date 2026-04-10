import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    await db.delete(schema.userProgress);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.challenges);
    await db.delete(schema.lessons);
    await db.delete(schema.units);
    await db.delete(schema.courses);
    await db.delete(schema.userSubscription);

    await db.insert(schema.courses).values([
      { id: 1, title: "English", imageSrc: "/flag.png" },
    ]);

    await db.insert(schema.units).values([
      { id: 1, courseId: 1, title: "Unit 1", description: "Learn the basics of English", order: 1 },
    ]);

    await db.insert(schema.lessons).values([
      { id: 1, unitId: 1, title: "Nouns", order: 1 },
      { id: 2, unitId: 1, title: "Verbs", order: 2 },
      { id: 3, unitId: 1, title: "Adjectives", order: 3 },
      { id: 4, unitId: 1, title: "Sentences", order: 4 },
    ]);

    // =====================
    // NOUNS - lesson 1
    // =====================
    await db.insert(schema.challenges).values([
      { id: 1,  lessonId: 1, type: "SELECT", questions: 'أي من هذه هي "رجل"؟',   order: 1 },
      { id: 2,  lessonId: 1, type: "SELECT", questions: 'أي من هذه هي "امرأة"؟', order: 2 },
      { id: 3,  lessonId: 1, type: "SELECT", questions: 'أي من هذه هي "ولد"؟',   order: 3 },
      { id: 4,  lessonId: 1, type: "ASSIST", questions: "رجل",                    order: 4 },
      { id: 5,  lessonId: 1, type: "SELECT", questions: 'أي من هذه هي "كرة"؟',   order: 5 },
      { id: 6,  lessonId: 1, type: "SELECT", questions: 'أي من هذه هي "روبوت"؟', order: 6 },
      { id: 7,  lessonId: 1, type: "SELECT", questions: 'أي من هذه هي "بنت"؟',   order: 7 },
      { id: 8,  lessonId: 1, type: "ASSIST", questions: "كرة",                    order: 8 },
    ]);

    await db.insert(schema.challengeOptions).values([
      // challenge 1 - رجل
      { id: 1,  challengeId: 1, correct: true,  text: "man",   imageSrc: "/man.jpg",   audioSrc: "/man_a.mp3" },
      { id: 2,  challengeId: 1, correct: false, text: "woman", imageSrc: "/woman.jpg", audioSrc: "/woman_a.mp3" },
      { id: 3,  challengeId: 1, correct: false, text: "robot", imageSrc: "/robot.jpg", audioSrc: "/robot_a.mp3" },

      // challenge 2 - امرأة
      { id: 4,  challengeId: 2, correct: true,  text: "woman", imageSrc: "/woman.jpg", audioSrc: "/woman_a.mp3" },
      { id: 5,  challengeId: 2, correct: false, text: "man",   imageSrc: "/man.jpg",   audioSrc: "/man_a.mp3" },
      { id: 6,  challengeId: 2, correct: false, text: "robot", imageSrc: "/robot.jpg", audioSrc: "/robot_a.mp3" },

      // challenge 3 - ولد
      { id: 7,  challengeId: 3, correct: false, text: "man",   imageSrc: "/man.jpg",   audioSrc: "/man_a.mp3" },
      { id: 8,  challengeId: 3, correct: false, text: "woman", imageSrc: "/woman.jpg", audioSrc: "/woman_a.mp3" },
      { id: 9,  challengeId: 3, correct: true,  text: "boy",   imageSrc: "/boy.png",   audioSrc: "/boy_a.mp3" },

      // challenge 4 - ASSIST رجل
      { id: 10, challengeId: 4, correct: true,  text: "man",   imageSrc: "/man.jpg",   audioSrc: "/man_a.mp3" },
      { id: 11, challengeId: 4, correct: false, text: "woman", imageSrc: "/woman.jpg", audioSrc: "/woman_a.mp3" },
      { id: 12, challengeId: 4, correct: false, text: "robot", imageSrc: "/robot.jpg", audioSrc: "/robot_a.mp3" },

      // challenge 5 - كرة
      { id: 13, challengeId: 5, correct: false, text: "man",   imageSrc: "/man.jpg",   audioSrc: "/man_a.mp3" },
      { id: 14, challengeId: 5, correct: false, text: "woman", imageSrc: "/woman.jpg", audioSrc: "/woman_a.mp3" },
      { id: 15, challengeId: 5, correct: true,  text: "ball",  imageSrc: "/ball.png",  audioSrc: "/ball_a.mp3" },

      // challenge 6 - روبوت
      { id: 16, challengeId: 6, correct: false, text: "boy",   imageSrc: "/boy.png",   audioSrc: "/boy_a.mp3" },
      { id: 17, challengeId: 6, correct: true,  text: "robot", imageSrc: "/robot.jpg", audioSrc: "/robot_a.mp3" },
      { id: 18, challengeId: 6, correct: false, text: "ball",  imageSrc: "/ball.png",  audioSrc: "/ball_a.mp3" },

      // challenge 7 - بنت
      { id: 19, challengeId: 7, correct: true,  text: "girl",  imageSrc: "/girl.png",  audioSrc: "/girl_a.mp3" },
      { id: 20, challengeId: 7, correct: false, text: "robot", imageSrc: "/robot.jpg", audioSrc: "/robot_a.mp3" },
      { id: 21, challengeId: 7, correct: false, text: "boy",   imageSrc: "/boy.png",   audioSrc: "/boy_a.mp3" },

      // challenge 8 - ASSIST كرة
      { id: 22, challengeId: 8, correct: false, text: "woman", imageSrc: "/woman.jpg", audioSrc: "/woman_a.mp3" },
      { id: 23, challengeId: 8, correct: true,  text: "ball",  imageSrc: "/ball.png",  audioSrc: "/ball_a.mp3" },
      { id: 24, challengeId: 8, correct: false, text: "boy",   imageSrc: "/boy.png",   audioSrc: "/boy_a.mp3" },
    ]);





    // =====================
// VERBS - lesson 2
// =====================
await db.insert(schema.challenges).values([
  { id: 9,  lessonId: 2, type: "SELECT", questions: 'أي من هذه هي "يشرب"؟', order: 1 },
  { id: 10, lessonId: 2, type: "SELECT", questions: 'أي من هذه هي "يأكل"؟', order: 2 },
  { id: 11, lessonId: 2, type: "ASSIST", questions: "يشرب",                  order: 3 },
]);

await db.insert(schema.challengeOptions).values([
  { id: 25, challengeId: 9,  correct: true,  text: "run",  audioSrc: "/run_a.mp3" },
  { id: 26, challengeId: 9,  correct: false, text: "eat",  audioSrc: "/eat_a.mp3" },
  { id: 27, challengeId: 9,  correct: false, text: "sleep", audioSrc: "/sleep_a.mp3" },

  { id: 28, challengeId: 10, correct: true,  text: "eat",  audioSrc: "/eat_a.mp3" },
  { id: 29, challengeId: 10, correct: false, text: "run",  audioSrc: "/run_a.mp3" },
  { id: 30, challengeId: 10, correct: false, text: "sleep", audioSrc: "/sleep_a.mp3" },

  { id: 31, challengeId: 11, correct: true,  text: "run",  audioSrc: "/run_a.mp3" },
  { id: 32, challengeId: 11, correct: false, text: "eat",  audioSrc: "/eat_a.mp3" },
  { id: 33, challengeId: 11, correct: false, text: "sleep", audioSrc: "/sleep_a.mp3" },
]);


console.log("Seeding finished")
    } catch (error) {
console.error(error);
throw new Error("Failed to seed the database")
    }
   
}

main();