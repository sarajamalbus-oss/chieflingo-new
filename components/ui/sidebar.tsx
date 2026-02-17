import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {
  ClerkLoading,
  ClerkLoaded,
  UserButton
} from "@clerk/nextjs"
 
import { Loader } from "lucide-react";

import { SidebarItem } from "./sidebar-item";

type props = {
  className?: string;
};

export const Sidebar = ({ className }: props) => {
  return (
    <div
      className={cn(
        "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
        className
      )}
    >
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/chieflogo.jpg" width={40} height={40} alt="Logo" />
          <h1 className="text-2xl font-bold text-green-600 tracking-wide">
            ChiefLingo
          </h1>
        </div>
      </Link>


      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem
         lablel="Learn" 
         href="/learn"
         iconSrc="/learn1.png" />


         <SidebarItem
         lablel="Leaderboard" 
         href="/leaderboard"
         iconSrc="/learnboard1.jpg" />


         <SidebarItem
         lablel="quests" 
         href="/quests"
         iconSrc="/dartboard1.png" />


         <SidebarItem
         lablel="shop" 
         href="/shop"
         iconSrc="/Shopping-icon1.png" />
      </div>
      <div className="p-4 ">
       <ClerkLoading>
        <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
       </ClerkLoading>
       <ClerkLoaded>
        <UserButton afterSignOutUrl="/"/>
       </ClerkLoaded>
      </div>
    </div>
  );
};
