"use client";

import { useState } from "react";
import Link from "next/link";
import { SidebarMenu } from "./SidebarMenu";
import { getSidebarGroups, getSidebarFooterItems } from "@/lib/config/sidebar";

const HamburgerIcon = () => (
  <svg className="size-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z" />
  </svg>
);

interface SidebarProps {
  user?: { roles?: string[]; permissions?: string[] } | null;
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ user = null, collapsed: controlledCollapsed, onToggle }: SidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const isControlled = onToggle != null && controlledCollapsed !== undefined;
  const collapsed = isControlled ? controlledCollapsed : internalCollapsed;

  const groups = getSidebarGroups();
  const footerItems = getSidebarFooterItems();
  const isOpen = !collapsed;

  const openSidebar = () => {
    if (collapsed) {
      if (isControlled) onToggle?.();
      else setInternalCollapsed(false);
    }
  };

  const closeSidebar = () => {
    if (!collapsed) {
      if (isControlled) onToggle?.();
      else setInternalCollapsed(true);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={openSidebar}
        className={`fixed left-4 top-16 z-40 rounded-lg bg-gray-800 p-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-opacity ${
          isOpen ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        aria-label="Abrir menu"
      >
        <HamburgerIcon />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          aria-hidden
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`fixed top-14 bottom-0 left-0 z-50 flex w-64 flex-col border-r border-gray-800 bg-gray-900 transition-transform duration-200 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Barra lateral"
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-800 px-4">
          <Link
            href="/admin"
            className="text-lg font-semibold text-white truncate min-w-0"
            onClick={() => closeSidebar()}
          >
            Admin
          </Link>
          <button
            type="button"
            onClick={closeSidebar}
            className="shrink-0 rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white"
            aria-label="Recolher menu"
          >
            <HamburgerIcon />
          </button>
        </div>

        <SidebarMenu groups={groups} footerItems={footerItems} user={user} />
      </aside>
    </>
  );
}
