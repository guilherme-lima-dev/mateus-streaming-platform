"use client";

import type { SidebarItem, SidebarMenuGroup as SidebarMenuGroupType, UserContext } from "@/types/sidebar";
import { filterMenuItems } from "@/lib/sidebar/filter";
import { SidebarMenuGroup } from "./SidebarMenuGroup";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { usePathname } from "next/navigation";

interface SidebarMenuProps {
  groups: SidebarMenuGroupType[];
  footerItems?: SidebarItem[];
  user?: UserContext | null;
}

function isItemActive(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  return pathname === href || pathname.startsWith(href + "/");
}

export function SidebarMenu({ groups, footerItems = [], user = null }: SidebarMenuProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col gap-6 px-3 py-4" aria-label="Menu principal">
      <div className="flex-1 space-y-6">
        {groups.map((group) => {
          const filtered = filterMenuItems(group.items, user);
          if (filtered.length === 0) return null;
          return (
            <SidebarMenuGroup
              key={group.title}
              title={group.title}
              items={filtered}
            />
          );
        })}
      </div>
      {footerItems.length > 0 && (
        <div className="border-t border-gray-800 pt-4 space-y-0.5">
          {footerItems.map((item) => (
            <SidebarMenuItem
              key={item.id}
              item={item}
              isActive={isItemActive(pathname, item.href)}
            />
          ))}
        </div>
      )}
    </nav>
  );
}
