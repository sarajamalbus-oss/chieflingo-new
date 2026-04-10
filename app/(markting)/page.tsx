"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignUpButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-6">

      {/* Image */}
      <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px]">
        <Image src="/characters.png" fill alt="Hero" />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center gap-y-8 text-center w-full max-w-md">
        <h1 className="text-xl lg:text-3xl font-bold text-neutral-600">
          Learn, Practice, and master English language with ChiefLingo.
        </h1>

        <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
          <ClerkLoading>
            <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
          </ClerkLoading>

          <ClerkLoaded>
            {/* User not signed in */}
            <SignedOut>
              <div className="flex flex-col gap-4 w-full">
                <SignUpButton mode="modal">
                  <Button size="lg" variant="secondary" className="w-full">
                    Get Started
                  </Button>
                </SignUpButton>

                <Button size="lg" variant="primaryOutline" className="w-full">
                  I already have an account
                </Button>
              </div>
            </SignedOut>

            {/* User signed in */}
            <SignedIn>
              <div className="flex flex-col gap-3 w-full">
                <Button
                  size="lg"
                  asChild
                  className="w-full"
                  variant="secondary"
                >
                  <Link
                    href={agreed ? "/learn" : "#"}
                    onClick={(e) => { if (!agreed) e.preventDefault(); }}
                    className={!agreed ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}
                  >
                    Continue Learning
                  </Link>
                </Button>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="privacy"
                    className="mt-1 w-4 h-4 cursor-pointer accent-sky-500 flex-shrink-0"
                    onChange={(e) => setAgreed(e.target.checked)}
                  />
                  <label
                    htmlFor="privacy"
                    className="text-xs text-muted-foreground leading-relaxed cursor-pointer text-left"
                  >
                    I agree to the{" "}
                    <Link href="/privacy" className="text-sky-500 underline">
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link href="/terms" className="text-sky-500 underline">
                      Terms of Service
                    </Link>
                    . By continuing, you consent to our data practices.
                  </label>
                </div>
              </div>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
}