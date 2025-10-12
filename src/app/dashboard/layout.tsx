// app/dashboard/layout.tsx

"use client"; // This must be a client component to use state

import React, { useState } from "react";
// We remove Clerk's server components as this is now a client component
// Authentication will be handled by Clerk's provider higher up the tree
import SideNav from "../_components/SideNav";
import MobileHeader from "../_components/MobileHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-950 to-indigo-950 text-white">
      <div className="flex h-full">
        <SideNav
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className="flex flex-1 flex-col">
          <MobileHeader toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          <main className="flex-1 p-4 sm:p-6 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}