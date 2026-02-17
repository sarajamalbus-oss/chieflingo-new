"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";

export const Footer = (  ) => {
    return (
        <div>
            <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
                <div className="max-w-screen-lg mx-auto flex items-center justify-evenly">
                <Button size="lg" variant="Ghost" className="-w-full">
                    <Image 
                    src="/flag.png" 
                    alt="English" 
                    height={32} 
                    width={40}
                    className="mr-4 arounded-md"
                    />

                    English
                </Button>
                </div>
            </footer>
        </div>
    );
};