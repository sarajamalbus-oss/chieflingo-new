"use client";

import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Sidebar } from "@/components/ui/sidebar";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button aria-label="Open menu">
          <Menu className="text-white" />
        </button>
      </SheetTrigger>

      <SheetContent className="p-0 z-[100]" side="left">
        <VisuallyHidden>
          <SheetTitle>Navigation Menu</SheetTitle>
        </VisuallyHidden>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}