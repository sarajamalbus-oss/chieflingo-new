"use client";

import { ClerkLoading } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Header() {
  return (
    <header className="h-20 w-full border-b-2 border-slate-200 px-4">
      <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">

        {/* Logo */}
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/chieflogo.jpg" width={40} height={40} alt="Logo" />
          <h1 className="text-2xl font-bold text-green-600 tracking-wide">ChiefLingo</h1>
        </div>

       
        <div className="flex items-center gap-4">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button
                className="text-green-600 font-serif font-bold text-2xl"
                size="lg"
                variant="default"  // <- تم تغييره هنا
              >
                Login
              </Button>
            </SignInButton>
          </SignedOut>

          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>
        </div>

      </div>
    </header>
  );
}









