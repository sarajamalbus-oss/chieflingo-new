import { MobileHeader } from "@/components/ui/modile-header";
import { Sidebar } from "@/components/ui/sidebar";
import { Children } from "react";
import { Toaster } from "@/components/ui/sonner";
import { ExitModal } from "@/components/ui/store/modals/exit-modal";
import { HeartsModal } from "@/components/ui/store/modals/hearts-modal";
import { PracticeModal } from "@/components/ui/store/modals/practice-modal";
type props = {
    children: React.ReactNode;
};

const MainLayout= ( {
    children
}: props) => {
    return( 
        <>
        <MobileHeader/>
           <Sidebar className="hidden lg:flex"/>

        <div>
            <main className="lg:pl-[256px] w-full pt-[50px] lg:pt-0">

             <div className="max-w-[1056px] mx-auto pt-6 w-full min-h-screen">

            <Toaster />
            <ExitModal />
            <HeartsModal />
            <PracticeModal />
            {children}
            </div>
            </main>
        </div>
        </>
     );
};

export default MainLayout;