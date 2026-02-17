"use client"

import Link from "next/link";
import { Check, Crown, Star } from "lucide-react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  id: number;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  percentage: number;
};

export const LessonButton = ({
  id,
  index,
  totalCount,
  locked,
  current,
  percentage,
}: Props) => {
  const cycleLength = 8;
  const cycleIndex = index % cycleLength;

  let indetationLevel;

  if (cycleIndex <= 2) {
    indetationLevel = cycleIndex;
  } else if (cycleIndex <= 4) {
    indetationLevel = 4 - cycleIndex;
  } else if (cycleIndex <= 6) {
    indetationLevel = 4 - cycleIndex;
  } else {
    indetationLevel = cycleIndex - 8;
  }

  const rightPosition = indetationLevel * 40;

  const isFirst = index === 0;
const isLast = index === totalCount;
  const isCompleted = !current && !locked;

const Icon = isCompleted ? Check : isLast ? Crown : Star;

  const href = isCompleted ? `/lesson/${id}` : "/lesson";

  return (
    <Link
      href={href}
      aria-disabled={locked}
      style={{ pointerEvents: locked ? "none" : "auto" }}
    >
      <div
        className="relative"
        style={{
          right: `${rightPosition}px`,
          marginTop: isFirst && isCompleted ? 60 : 24,
        }}
      >
        {current ? (
          <div className="h-[102px] w-[102px] relative">
            {/* تاج Start */}
            <div className="absolute -top-5 left-5 px-1.5 py-2.5 border-2 font-bold uppercase text-green-500 bg-white rounded-xl animate-bounce tracking-wide z-10">
              Start
              <div className="absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-x-1/2" />
            </div>

            <div className="relative h-full w-full">
              <CircularProgressbarWithChildren
                value={Number.isNaN(percentage) ? 0 : percentage}
                styles={{
                  path: {
                    stroke: "#4ade80",
                  },
                  trail: {
                    stroke: "#e5e7eb",
                  },
                }}
              >
                {/* زر الدرس */}
        <Button
  size="rounded"
  variant={locked ? "locked" : "secondary"}
  className={cn(
    "h-[65px] w-[65px] border-b-8 flex items-center justify-center",
    // أي SVG جوّه الزر يتكبر ما عدا check (المكتمل)
    "[&>svg:not([data-check])]:scale-[2]"
  )}
>
  <Icon
   style={{
    width: isCompleted ? 10 : 20,
    height: isCompleted ? 10 : 20,
  }}
    data-check={isCompleted ? true : undefined}
    size={40}
    className={cn(
      locked
        ? "fill-neutral-400 text-neutral-400 stroke-neutral-400"
        : "fill-primary-foreground text-primary-foreground",
      isCompleted && "fill-none stroke-[4]"
    )}
  />
</Button>


               
              </CircularProgressbarWithChildren>
            </div>
          </div>
        ) : (
         <Button
  size="rounded"
  variant={locked ? "locked" : "secondary"}
  className="h-[65px] w-[65px] border-b-8 flex items-center justify-center"
>
 <Icon
  style={{
    width: isCompleted ? 30 : 50,
    height: isCompleted ? 30 : 50,
  }}
   size={40}
   strokeWidth={2}
  className={cn(
    locked
        ? "fill-neutral-400 text-neutral-400 stroke-neutral-400"
        : "fill-primary-foreground text-primary-foreground",
    isCompleted && "fill-none stroke-[5]"
  )}
/>


</Button>

        )}
      </div>
    </Link>
  );
};
