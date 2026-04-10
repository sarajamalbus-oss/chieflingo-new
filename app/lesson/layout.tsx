import { ExitModal } from "@/components/ui/store/modals/exit-modal";
import { PracticeModal } from "@/components/ui/store/modals/practice-modal";

type Props = {
    children: React.ReactNode
};

const LessonLayout = ({ children }: Props) => {
    return ( 
        <div className="flex flex-col h-full">
            <ExitModal />
            <PracticeModal />
            <div className="flex flex-col h-full w-full">
              {children}
            </div>
        </div>
    );
}

export default LessonLayout;