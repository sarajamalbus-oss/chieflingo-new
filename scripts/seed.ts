import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "@/db/schema";
import { challenges } from "@/db/schema";


const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
    try {
console.log("Seeding database");

await db.delete(schema.courses);
await db.delete(schema.userProgress);
await db.delete(schema.units);
await db.delete(schema.lessons);
await db.delete(schema.challenges);
await db.delete(schema.challengeOptions);
await db.delete(schema.userSubscription);



await db.insert(schema.courses).values([
    {
        id:1,
        title: "English",
        imageSrc: "flag.png"
    },

    ])
    await db.insert(schema.units).values([
        {
            id: 1,
            courseId: 1,
            title: "Unit 1",
            description: "Learn the basic of English",
            order: 1,
        }

]);

await db.insert(schema.lessons).values([
    {
        id: 1,
        unitId: 1,
        order: 1,
        title: "Nouns",
    },

    {
        id: 2,
        unitId: 1,
        order: 2,
        title: "Verbs",
    },

     {
        id: 3,
        unitId: 1,
        order: 3,
        title: "Family", 
     },


    {
        id: 4,
        unitId: 1,
        order: 4,
        title: "Vegetables", 
     },

     {
       id: 5,
        unitId: 1,
        order: 5,
        title: "Vegetables", 
     },
]);


await db.insert(schema.challenges).values([
  {
    id: 1,
    lessonId: 1,
    type: "SELECT",
    questions:'أي من هذه الأختيارات هي "رجل؟',
    order: 1,
  },


    {
    id: 2,
    lessonId: 1,
    type: "ASSIST",
    questions: "رجل",
    order: 2,
  },

   {
    id: 3,
    lessonId: 1,
    type: "SELECT",
    questions: 'أي من هذه الأشياء هو "روبوت؟"',
    order: 3,
  },
]); 


await db.insert(schema.challengeOptions).values([
  {
    id: 1,
    challengeId: 1,
     imageSrc: "/man.jpg",
    audioSrc: "/man_a.mp3",
    text: "man",  //the answer of which oh these is the man
    correct: true,
  },

  {
    id: 2,
    challengeId: 1,
     imageSrc: "/woman.jpg",
    audioSrc: "/woman_a.mp3",
    text: "woman",  
    correct: false,
  },

  
  {
    id: 3,
    challengeId: 1,
     imageSrc: "/robot.jpg",
    audioSrc: "/robot_a.mp3",
    text: "robot",  
    correct: false,
  },
]);


await db.insert(schema.challengeOptions).values([
  {
    id: 4,
    challengeId: 2,
    audioSrc: "/man_a.mp3",
    text: "man",  //the answer of which oh these is the man
    correct: true,
  },

  {
    id: 5,
    challengeId: 2,
    audioSrc: "/woman_a.mp3",
    text: "woman",  //the answer of which oh these is the man
    correct: false,
  },

  
  {
    id: 6,
    challengeId: 2,
    audioSrc: "/robot_a.mp3",
    text: "robot",  //the answer of which oh these is the man
    correct: false,
  },
]);



await db.insert(schema.challengeOptions).values([
  {
    id: 7,
    challengeId: 3,
     imageSrc: "/man.jpg",
    audioSrc: "/man_a.mp3",
    text: "man", 
    correct: false,
  },

  {
    id: 8,
    challengeId: 3,
     imageSrc: "/woman.jpg",
    audioSrc: "/woman_a.mp3",
    text: "woman", 
    correct: false,
  },

  
  {
    id: 9,
    challengeId: 3,
     imageSrc: "/robot.jpg",
    audioSrc: "/robot_a.mp3",
    text: "robot",  
    correct: true,
  },
]);



await db.insert(schema.challenges).values([
  {
    id: 4,
    lessonId: 2,
    type: "SELECT",
    questions:'أي من هذه الأختيارات هي "رجل؟',
    order: 1,
  },


    {
    id: 5,
    lessonId: 2,
    type: "ASSIST",
    questions: "رجل",
    order: 2,
  },

   {
    id: 6,
    lessonId: 2,
    type: "SELECT",
    questions: 'أي من هذه الأشياء هو "روبوت؟"',
    order: 3,
  },
]); 


console.log("Seeding finished")
    } catch (error) {
console.error(error);
throw new Error("Failed to seed the database")
    }
   
}

main();