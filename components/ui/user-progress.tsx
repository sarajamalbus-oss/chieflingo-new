"use client";

import { propagateServerField } from "next/dist/server/lib/render-server";
import Link from "next/link";
import { Button } from "./button";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";

type props ={
    activeCourse: {imageSrc: string; title: string};
    hearts: number;
    points: number;
    hasActiveSubscription: boolean;
};

export const UserProgress = ({
    activeCourse,
     points, 
     hearts, 
     hasActiveSubscription
    }: props) => {
    return (
        <div className="flex items-center justify-between gap-x-2 w-full">
          <Link href="/courses">
          <Button variant="Ghost">
      {activeCourse?.imageSrc && (
  <Image
     src={
      activeCourse.imageSrc.startsWith("/")
        ? activeCourse.imageSrc
        : `/${activeCourse.imageSrc}`
    }
    alt={activeCourse.title}
    className="rounded-md border"
    width={40}
    height={40}
  />
)}

      
    </Button>
  </Link>
  <Link href="/shop">
  <Button variant="Ghost" className="text-orange-500">
    <Image src="/points.png" height={28} width={28} alt="points"
    className="mr-2"
    />
    {points}

  </Button>
  </Link>



  <Link href="/shop">
  <Button variant="Ghost" className="text-rose-500">
    <Image src="/hearts.jpg" height={22} width={22} alt="hearts"
    className="mr-2"
    />
    {hasActiveSubscription ? <InfinityIcon className="h-4 w-4 stroke-[3]"/> : hearts}

  </Button>
  </Link>
</div>


    );
};
