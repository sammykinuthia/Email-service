// app/dashboard/layout.tsx

"use client";

import React, { useState } from "react";
import MobileHeader from "../_components/MobileHeader";
import SideNav from "../_components/SideNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    // Use w-full instead of w-screen and ensure body has overflow-x-hidden
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-950 to-indigo-950 text-white">
      <div className="flex">
        <SideNav
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        {/* This div allows the main content to shrink and grow correctly */}
        <div className="flex min-w-0 flex-1 flex-col">
          <MobileHeader toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          {/* Main content area scrolls independently on overflow */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}