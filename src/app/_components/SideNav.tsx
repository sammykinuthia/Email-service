// app/dashboard/_components/SideNav.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, KeyRound, History, ShieldCheck } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";

const navLinks = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/dashboard/projects", icon: KeyRound },
  { name: "Logs", href: "/dashboard/logs", icon: History },
];

interface SideNavProps {
  isOpen: boolean;
  onClose: () => void; // Function to close the sidebar
}

export default function SideNav({ isOpen, onClose }: SideNavProps) {
  const pathname = usePathname();
  const { user } = useUser(); // Get the current user
   // Check if the current user is the admin
  const isAdmin = user?.primaryEmailAddress?.emailAddress === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  return (
    <>
      {/* Backdrop for mobile view */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* The actual sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 flex h-full w-64 flex-col justify-between bg-black/20 p-6 backdrop-blur-lg
                   transition-transform duration-300 ease-in-out md:sticky md:translate-x-0
                   ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-full">
          <div className="mb-10">
            <Link href="/" className="text-2xl font-bold tracking-wider text-white">
              <Image src={"/logo.svg"} alt="Mail Service Logo" width={130} height={40} className="object-contain" />
            </Link>
          </div>
          <ul className="space-y-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={onClose} // Close sidebar on link click
                    className={`flex items-center gap-4 rounded-lg p-3 transition-colors duration-200 ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "text-blue-200 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <link.icon className="h-5 w-5" />
                    <span className="font-medium">{link.name}</span>
                  </Link>
                </li>
              );
            })}

            {/* ---- CONDITIONAL ADMIN LINK ---- */}
            {isAdmin && (
              <li>
                <Link
                  href="/dashboard/admin-contacts"
                  onClick={onClose}
                  className={`flex items-center gap-4 rounded-lg p-3 transition-colors duration-200 ${
                    pathname === "/dashboard/admin"
                      ? "bg-white/20 text-white"
                      : "text-blue-200 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <ShieldCheck className="h-5 w-5" />
                  <span className="font-medium">Admin Contacts</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
        {/* Hide the profile section on mobile as it's in the MobileHeader */}
        <div className="mt-auto hidden md:block justify-end">
          <div className="flex items-center gap-4 rounded-lg bg-white/5 p-3">
            <UserButton afterSignOutUrl="/" />
            <span className="text-sm font-medium text-white">My Profile</span>
          </div>
        </div>
      </aside>
    </>
  );
}