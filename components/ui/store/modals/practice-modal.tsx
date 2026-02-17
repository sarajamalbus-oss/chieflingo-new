"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
     DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePracticeModal } from "../use-practice-modal";


export const PracticeModal = () => {
const router = useRouter();
const [isclient, setIsClient] = useState(false);
const { isOpen, close } = usePracticeModal();

useEffect(() => setIsClient(true), []);



if (!isclient) {
    return null;
}

return (
    <Dialog open={isOpen} onOpenChange={close}>
       <DialogContent className="max-w-md">
        <DialogClose asChild></DialogClose>
        <DialogHeader>
            <div className="flex items-center w-full justify-center mb-5">
                <Image 
                src="/hearts.jpg"
                alt="Heart"
                height={100}
                width={100}
                />
            </div>
            <DialogTitle className="text-center font-bold text-2xl">
                 Practice lesson.
            </DialogTitle>
            <DialogDescription className="text-center text-base">
                Use practice lesson to regain hearts and points. You cannot loose heart or points in practice lessons.
            </DialogDescription>
        </DialogHeader>
        <DialogFooter className="md-4">
            <div className="flex flex-col gap-y-4 w-full">
                
   

                <Button
                variant="primary" 
                className="w-full"
                 size="lg" 
                 onClick={close}
                 >
                    I understande.
                </Button>
                
            </div>

        </DialogFooter>
       </DialogContent>
    </Dialog>
);
};