import type { SidebarIconName } from "@/types/sidebar";

const iconPaths: Record<SidebarIconName, React.ReactNode> = {
  home: (
    <path
      fill="currentColor"
      d="M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414l-7-7Z"
    />
  ),
  video: (
    <path
      fill="currentColor"
      d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm0 2h12v12H4V6Zm4.5 2.5v7l5.5-3.5-5.5-3.5Z"
    />
  ),
  "layout-dashboard": (
    <path
      fill="currentColor"
      d="M3 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5Zm0 9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4Zm9-9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V5Zm0 9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4Z"
    />
  ),
  catalog: (
    <path
      fill="currentColor"
      d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.5V4a2 2 0 0 0-2-2H7.5A2 2 0 0 0 5.5 4v2H4Zm3 0V4a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v2h-5Zm-2 4h10v8H5V8Z"
    />
  ),
  "arrow-left": (
    <path
      fill="currentColor"
      d="M10.707 3.293a1 1 0 0 0-1.414 0l-6 6a1 1 0 0 0 0 1.414l6 6a1 1 0 0 0 1.414-1.414L6.414 11H20a1 1 0 1 0 0-2H6.414l4.293-4.293a1 1 0 0 0 0-1.414Z"
    />
  ),
};

interface SidebarIconProps {
  name: SidebarIconName;
  className?: string;
}

export function SidebarIcon({ name, className = "size-5" }: SidebarIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {iconPaths[name]}
    </svg>
  );
}
