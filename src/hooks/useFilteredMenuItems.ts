import { useMemo } from "react";
import type { SidebarItem, UserContext } from "@/types/sidebar";
import { filterMenuItems } from "@/lib/sidebar/filter";

export function useFilteredMenuItems(
  items: SidebarItem[],
  user: UserContext | null
): SidebarItem[] {
  return useMemo(() => filterMenuItems(items, user), [items, user]);
}
