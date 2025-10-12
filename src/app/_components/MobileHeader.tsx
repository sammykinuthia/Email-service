// app/dashboard/_components/MobileHeader.tsx

"use client";

import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Link from "next/link";

interface MobileHeaderProps {
  toggleSidebar: () => void;
}

export default function MobileHeader({ toggleSidebar }: MobileHeaderProps) {
  return (
    <header className="md:hidden sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/20 bg-blue-950/50 px-4 backdrop-blur-lg sm:px-6">
      <Link href="/" className="text-xl font-bold text-white">
        <img src="/logo.svg" alt="Mail Service Logo" className="h-10 w-auto" />
      </Link>
      <div className="flex items-center gap-4">
        <UserButton afterSignOutUrl="/" />
        <button
          onClick={toggleSidebar}
          className="p-2 text-white"
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}