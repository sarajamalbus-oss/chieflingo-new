import { FeedWrapper } from "@/components/ui/feed-wrapper";
import { StickyWrapper } from "@/components/ui/sticky-wrapper";
import { UserProgress } from "@/components/ui/user-progress";
import {  getUserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";
import Image from "next/image"
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Promo } from "@/components/promo";
import { quests } from "@/constants";



const QuestsPage = async () => {
const userProgressData = getUserProgress();
const userSubscripionData = getUserSubscription();


const [
    userProgress,
    userSubscripion,
    
] = await Promise.all([
    userProgressData,
    userSubscripionData,
    
]);

if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
}

const isPro = !!userSubscripion?.isActive;
return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
        <StickyWrapper>
            <UserProgress 
            activeCourse={userProgress.activeCourse}
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={isPro}
            />

            {!isPro && (
                   <Promo />
                   )}

        </StickyWrapper>
        <FeedWrapper>
            <div className="w-full flex flex-col items-center">
            <Image 
            src="/dartboard1.png"
            alt="Quests"

            height={90}
            width={90}
            />
           <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Quests
           </h1>
           <p className="text-muted-foreground text-center text-lg mb-6">
            Complete quests by earning points.
           </p>
          
          <ul className="w-full">
             {quests.map((quest) => {
                const progress = Math.min(
  (userProgress.points / quest.value) * 100,
  100
);


                
                console.log("POINTS:", userProgress.points);
                console.log("QUEST:", quest.value);
                console.log("PROGRESS:", progress);

                return (
                    <div
                    className="flex items-center w-full p-4 gap-x-3"
                    key={quest.title}
                    >
                     <Image 
                     src="/points.jpg"
                     alt="Points"
                     width={40}
                     height={40}
                     />

                     <div className="flex flex-col gap-y-2 w-full">
                         <p className="text-neutral-700 text-sm font-bold">
                            {quest.title}
                         </p>
                         <Progress value={progress} className="h-3 w-full bg-gray-200 [&>div]:bg-green-500" />


                     </div>
                    </div>
                )
             })}
          </ul>
          
            </div>
        </FeedWrapper>
    </div>
);
};

export default QuestsPage;