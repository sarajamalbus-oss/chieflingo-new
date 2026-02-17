import { cn } from "@/lib/utils";
import Image from "next/image";
import { challenges } from "@/db/schema";
import { useCallback } from "react";
import { useAudio, useKey } from "react-use" 

type Props = {
  id: number;
  imageSrc: string | null;
  audioSrc: string | null;
  text: string;
  shortcut: string;
  selected?: boolean;
  onClick: () => void;
  disabled?: boolean;
  status: "correct" | "wrong" | "none";
type: "ASSIST" | "SELECT"};

export const Card = ({
  imageSrc,
  audioSrc,
  text,
  selected,
  onClick,
  disabled,
  status,
  type,
  shortcut,
}: Props) => {
  

const [audio, _, controls] = useAudio({ src: audioSrc ?? ""});

const handelClick = useCallback(() => {
    if(disabled) return;
    if(audioSrc) controls.play();  // ← شغّلي الصوت بس لو فيه audioSrc
    onClick();
}, [disabled, onClick, controls, audioSrc]);

  useKey(shortcut, handelClick, {}, [handelClick]);
  return (
    <div
      onClick={handelClick}
   className={cn(
  "h-full border-2 rounded-xl border-b-4 p-4 lg:p-6 cursor-pointer flex flex-col items-center",
  "transition-all duration-200", // لتأثير سلس
  !disabled && "hover:border-neutral-300 hover:bg-neutral-50", // hover عندما لا يكون disabled
  selected && "border-sky-300 bg-sky-100",
  selected && status === "correct" && "border-green-300 bg-green-100",
  selected && status === "wrong" && "border-rose-300 bg-rose-100",
  disabled && "pointer-events-none opacity-50"
)}

    >
      {audio}
      {imageSrc && (
        <div className="relative w-32 h-32 mb-3"> {/* حجم أكبر قليلاً */}
          <Image
            src={imageSrc}
            alt={text}
            fill
            className="object-contain rounded-md"
          />
        </div>
      )}

      <div className={cn(
        "flex items-center justify-between",
         type === "ASSIST" && "flex-row-reverse"
      )}>
        {type === "ASSIST" && <div />}
      </div>
      <p className={cn(
        "text-neutral-600 text-sm lg:text-base",
        selected && "text-sky-500",
        selected && status ==="correct" && "text-green-500",
        selected && status ==="wrong" && "text-rose-500",

      )}
      >{text}
      </p>
      <div className={cn(
        "lg:w-[30px] lg:h-[30px] w-[20px] h-[20px] border-2 flex items-center justify-center rounded-lg text-neutral-400 lg:text-[15px] text-xs font-semibold",selected && "text-sky-500",
        selected && status ==="correct" && "border-green-500 text-green-500",
        selected && status ==="wrong" && "border-rose-500 text-rose-500",
      )}>
              {shortcut}
      </div>
    </div>
  );
};
