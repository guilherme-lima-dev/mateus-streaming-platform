"use client";

import type { SidebarItem } from "@/types/sidebar";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { usePathname } from "next/navigation";

interface SidebarMenuGroupProps {
  title: string;
  items: SidebarItem[];
}

function isItemActive(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(href + "/");
}

export function SidebarMenuGroup({ title, items }: SidebarMenuGroupProps) {
  const pathname = usePathname();

  if (items.length === 0) return null;

  return (
    <div className="space-y-1">
      <h3 className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
        {title}
      </h3>
      <ul className="space-y-0.5" role="list">
        {items.map((item) => (
          <li key={item.id}>
            <SidebarMenuItem
              item={item}
              isActive={isItemActive(pathname, item.href)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
