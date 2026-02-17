"use client"

import { challengeOptions, challenges, userSubscription } from "@/db/schema";

import { Challenge } from "./challenge";
import Image from "next/image";
import Confetti from "react-confetti";

import { useState, useTransition } from "react";
import { Header } from "./header";
import { QuestionBubble } from "./question-bubble";
import { Footer } from "./footer";
import { start } from "repl";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { toast } from "sonner";
import { reduceHearts } from "@/actions/user-progress";
import { useAudio, useWindowSize, useMount } from "react-use";
import { ResultCard } from "./result-card";
import { useRouter } from "next/navigation";
import { useHeartsModal } from "@/components/ui/store/use-hearts-modal ";
import { usePracticeModal } from "@/components/ui/store/use-practice-modal";

type Props ={
    initialPercentage: number;
    initialHearts: number;
    initialLessonId: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & { 
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];
    })[];
    userSubscription: typeof userSubscription.$inferSelect & {
        isActive: boolean;
    } | null;
};

export const Quiz = ({
    initialPercentage,
    initialHearts,
    initialLessonId,
    initialLessonChallenges,
    userSubscription
}: Props) => {
    const { open: openHeartsModal } = useHeartsModal();
    const { open: openPracticeModal } = usePracticeModal();

    useMount(() => {
        if (initialPercentage === 100) {
            openPracticeModal();
        }
    })
    const { width, height } = useWindowSize();

    const router = useRouter();
    const [finishAudio] = useAudio({ src: "/finish_a.mp3", autoPlay: true});
    const [
        correctAudio,
        _c,
        correctControls,
    ] = useAudio({ src: "/correct_a.mp3"});


     const [
        incorrectAudio,
        _i,
        incorrectControls,
    ] = useAudio({ src: "/incorrect_a.mp3"});



        const [pending, startTransition] = useTransition();

        const [lessonId, setLessonId] = useState(initialLessonId)
        const [hearts, setHearts] = useState( initialHearts);
        const [percentage, setpercentage] = useState(() => {
            return initialPercentage === 100? 0 : initialPercentage;
        });
        const [challenges] = useState(initialLessonChallenges);
        const [activeIndex, setActiveIndex] =useState(() => {
            const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed);
            return uncompletedIndex === -1 ? 0 : uncompletedIndex;
        });

        const [selectedOption, setSlectedOption] = useState<number>();
        const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

        const challenge = challenges[activeIndex];
        const options = challenge?.challengeOptions ?? [];

        const onNext =() => {
            setActiveIndex((current) => current + 1);
        };

        const onSelect = (id: number) => {
            if (status !== "none") return;

            setSlectedOption(id);
        };

        const onContinue = () => {
           if (!selectedOption) return;

           if (status === "wrong") {
            setStatus("none");
            setSlectedOption(undefined);
            return;
           }

            if (status === "correct") {
            onNext();
            setStatus("none");
            setSlectedOption(undefined);
            return;
           }

           const correctOption = options.find((option) => option.correct);

           if (!correctOption) {
            return;
           }
              if (correctOption && correctOption.id === selectedOption) {
                startTransition(() => {
                    upsertChallengeProgress(challenge.id)
                    .then((response) => {
                        if (response?.error === "hearts") {
                            openHeartsModal();
                            return;
                        }
                        
                        setStatus("correct");
                        correctControls.play();
                        setpercentage((prev) => prev + 100 / challenges.length);


                        if (initialPercentage === 100) {
                            setHearts((prev) => Math.min(prev + 1, 5));
                        }
                    })

                    .catch(() => toast.error("Somting went wrong. Please try again."))
                })
                console.log("correct option!");
              } else {
                startTransition(() => {
                    reduceHearts(challenge.id)
                    .then((response) => {
                        if (response?.error === "hearts") {
                            openHeartsModal();
                            return;
                        }
                        incorrectControls.play();
                        setStatus("wrong");

                        if (!response?.error) {
                            setHearts((prev) => Math.max(prev - 1, 0));
                        }
                    })
                    .catch(() => toast.error("Something went wrong. Please try again."))
                })
              }
        };
        
         if (!challenge) {
            return (
                <>
                {finishAudio}
                <Confetti 
                width={width}
                height={height}
                recycle={false}
                numberOfPieces={500}
                tweenDuration={10000}
                />
                <div className="min-h-screen flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center">
  <Image 
    src="/finish.jpg"
    alt="Finish"
    className="hidden lg:block"
    height={300}
    width={300}
  />

  <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
    Great job! <br /> You've completed the lesson.
  </h1>

  <div className="flex items-center justify-center gap-x-4 w-full">
    <ResultCard 
      variant="points"
      value={challenges.length * 10}
    />

    <ResultCard 
      variant="hearts"
      value={hearts}
    />
  </div>
  

  </div>
   <Footer 
   lessonId={lessonId}
   status="completed"
   onCheck={() => router.push("/learn")}
   />

                </>
            )
         }


        const title = challenge.type === "ASSIST" ? "أختر المعني الصحيح"
        : challenge.questions;

    return (

        <>

        {incorrectAudio}
        {correctAudio}

        <Header 
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
        />  
        <div className="flex-1">
            <div className="h-full flex items-center justify-center">
               <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                 <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
                    {title}
                  </h1>
                 <div>
                   {challenge.type === "ASSIST" && (
                    <QuestionBubble  questions={challenge.questions}/>
                   )} 
                   <Challenge
                   options={options}
                   onSelect={onSelect}
                   status={status}
                   selectedOption={selectedOption}
                   disabled={pending}
                    type={challenge.type}
                   />
                 </div>
               </div>
            </div>
            
            </div> 

            <Footer 
            disabled={pending || !selectedOption}
            status={status}
            onCheck={onContinue}
            />
        </>
    )
}