"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
      />
      <main
        className={`pt-14 transition-[padding] duration-200 lg:pt-0 ${
          collapsed ? "lg:pl-0" : "lg:pl-64"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
