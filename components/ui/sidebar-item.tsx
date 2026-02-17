"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { use } from "react";

type props= {
    lablel: string;
    iconSrc: string;
    href: string;
};

export const SidebarItem = ({
    lablel,
    iconSrc,
    href,
}: props) => {
    const pathname = usePathname();
    const active= pathname === href;
     
    return (
        <Button
        variant={ active ? "SidebarOutline" : "Sidebar"}
        className="justify-start h-[52px]"
        asChild 
        >
            <Link href={href}>
            <Image 
            src={iconSrc}
            alt={lablel}
            className="mr-5"
            height={32}
            width={32}
            />
             {lablel}
             </Link>
        </Button>
    );
};