import type { SidebarItem, SidebarMenuGroup } from "@/types/sidebar";

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    id: "admin-dashboard",
    label: "Dashboard",
    href: "/admin",
    icon: "layout-dashboard",
    group: "admin",
    roles: ["admin"],
  },
  {
    id: "admin-videos",
    label: "Gerenciar Vídeos",
    href: "/admin/videos",
    icon: "video",
    group: "admin",
    roles: ["admin"],
  },
];

export const SIDEBAR_FOOTER_ITEMS: SidebarItem[] = [
  {
    id: "back-catalog",
    label: "Voltar ao Catálogo",
    href: "/",
    icon: "arrow-left",
    group: "navigation",
  },
];

export function getSidebarGroups(): SidebarMenuGroup[] {
  const adminItems = SIDEBAR_ITEMS.filter((i) => i.group === "admin");
  const groups: SidebarMenuGroup[] = [];
  if (adminItems.length > 0) {
    groups.push({ title: "Admin", items: adminItems });
  }
  return groups;
}

export function getSidebarFooterItems(): SidebarItem[] {
  return SIDEBAR_FOOTER_ITEMS;
}
