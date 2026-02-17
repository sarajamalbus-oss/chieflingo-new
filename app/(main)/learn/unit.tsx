import { lessons, units } from "@/db/schema";
import { db } from "@/db/drizzle";
import { UnitBanner } from "./unite-banner";
import { LessonButton } from "./lesson-button";

type Props = {
    id: number;
    order: number;
    title: string;
    description: string;
    lessons: (typeof lessons.$inferSelect & { completed: boolean })[]


activeLesson:
  | (typeof lessons.$inferSelect & {
      unit: typeof units.$inferSelect;
    })
  | undefined;

  activeLessonPercentage: number;
}
export const Unit = ({
    id,
    order,
    title,
    description,
    lessons,
    activeLesson,
    activeLessonPercentage,
}: Props) => {
    return (
        <>
        <UnitBanner title={title} description={description} />
        <div className="flex items-center flex-col relative">
            {lessons.map((lesson, index) => {
                const isCurrecnt = lesson.id === activeLesson?.id;
                const isLocked = ! lesson.completed && ! isCurrecnt;
            
                   return(
                    <LessonButton
                    key={lesson.id}
                    id={lesson.id}
                    index={index}
                    totalCount={lessons.length - 1}
                    current={isCurrecnt}
                    locked={isLocked}
                    percentage={activeLessonPercentage}
                    />
                   );
              }
           )
        };

        </div>
        </>
        
    );
};