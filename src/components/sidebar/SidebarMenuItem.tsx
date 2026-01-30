"use client";

import Link from "next/link";
import type { SidebarItem } from "@/types/sidebar";
import { SidebarIcon } from "./SidebarIcon";

interface SidebarMenuItemProps {
  item: SidebarItem;
  isActive: boolean;
}

export function SidebarMenuItem({ item, isActive }: SidebarMenuItemProps) {
  return (
    <Link
      href={item.href}
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
        isActive
          ? "bg-blue-600 text-white"
          : "text-gray-300 hover:bg-gray-800 hover:text-white"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      {item.icon && (
        <SidebarIcon name={item.icon} className="size-5 shrink-0" />
      )}
      <span>{item.label}</span>
    </Link>
  );
}
