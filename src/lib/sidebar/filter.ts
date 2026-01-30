import type { SidebarItem, UserContext } from "@/types/sidebar";

export function canAccessMenuItem(
  item: SidebarItem,
  user: UserContext | null
): boolean {
  if (!item.roles?.length && !item.permission) return true;
  if (user == null) return true;
  if (item.permission && user.permissions?.includes(item.permission))
    return true;
  if (item.roles?.some((role) => user.roles?.includes(role))) return true;
  return false;
}

export function filterMenuItems(
  items: SidebarItem[],
  user: UserContext | null
): SidebarItem[] {
  return items.filter((item) => canAccessMenuItem(item, user));
}
