export type SidebarIconName =
  | "home"
  | "video"
  | "catalog"
  | "arrow-left"
  | "layout-dashboard";

export interface SidebarItem {
  id: string;
  label: string;
  href: string;
  icon?: SidebarIconName;
  group?: string;
  permission?: string;
  roles?: string[];
}

export interface SidebarMenuGroup {
  title: string;
  items: SidebarItem[];
}

export interface UserContext {
  roles?: string[];
  permissions?: string[];
}
