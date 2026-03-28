// src/config/sidebarConfig.tsx

import {
  LayoutDashboard,
  Scissors,
  Video,
  Bell,
  FileText,
  ClipboardList,
  Brain,
  Users,
  Settings,
  DoorOpen,
} from "lucide-react";

/**
 * Sidebar Item Type
 */
export type SidebarItem = {
  label: string;
  icon: any;
  path: string;
};

/**
 * UI Role Types
 */
export type UserRole =
  | "hospital_admin"
  | "department"
  | "doctor"
  | "external"
  | "student"
  | "system_admin";

/**
 * 🔥 BASE PATH PER ROLE
 */
export const getBasePath = (role: UserRole): string => {
  switch (role) {
    case "hospital_admin":
    case "system_admin":
      return "/admin";

    case "doctor":
      return "/doctor";

    case "department":
      return "/department";

    case "student":
      return "/student";

    case "external":
      return "/external";

    default:
      return "";
  }
};

/**
 * 🔥 MENU DEFINITIONS (NO PATHS HERE)
 */
const menu = {
  dashboard: {
    label: "Dashboard",
    icon: LayoutDashboard,
    slug: "dashboard",
  },
  surgeries: {
    label: "Surgeries",
    icon: Scissors,
    slug: "surgeries",
  },
  videos: {
    label: "Videos",
    icon: Video,
    slug: "videos",
  },
  pendingVideos: {
    label: "Pending Videos",
    icon: Video,
    slug: "pending-videos",
  },
  alerts: {
    label: "Alerts",
    icon: Bell,
    slug: "alerts",
  },
  reports: {
    label: "Reports",
    icon: FileText,
    slug: "reports",
  },
  audit: {
    label: "Audit Logs",
    icon: ClipboardList,
    slug: "audit",
  },
  ai: {
    label: "AI Analysis",
    icon: Brain,
    slug: "ai",
  },
  users: {
    label: "Users & Depts",
    icon: Users,
    slug: "users",
  },
  rooms: {
    label: "Operating Rooms",
    icon: DoorOpen,
    slug: "rooms",
  },
  settings: {
    label: "Settings",
    icon: Settings,
    slug: "settings",
  },
};

/**
 * 🔥 BUILD ITEM WITH BASE PATH
 */
const buildItem = (
  base: string,
  item: { label: string; icon: any; slug: string }
): SidebarItem => {
  // ✅ GLOBAL ROUTES (no base path)
  const globalRoutes = ["videos","reports","ai","audit"];

  if (globalRoutes.includes(item.slug)) {
    return {
      label: item.label,
      icon: item.icon,
      path: `/${item.slug}`, // 🔥 force global
    };
  }

  // default behavior
  return {
    label: item.label,
    icon: item.icon,
    path: `${base}/${item.slug}`,
  };
};

/**
 * 🔥 FULLY DYNAMIC SIDEBAR
 */
export const getSidebarByRole = (role: UserRole): SidebarItem[] => {
  const base = getBasePath(role);

  const items = {
    dashboard: buildItem(base, menu.dashboard),
    surgeries: buildItem(base, menu.surgeries),
    videos: buildItem(base, menu.videos),
    pendingVideos: buildItem(base, menu.pendingVideos),
    alerts: buildItem(base, menu.alerts),
    reports: buildItem(base, menu.reports),
    audit: buildItem(base, menu.audit),
    ai: buildItem(base, menu.ai),
    users: buildItem(base, menu.users),
    rooms: buildItem(base, menu.rooms),
    settings: buildItem(base, menu.settings),
  };

  const config: Record<UserRole, SidebarItem[]> = {
    hospital_admin: Object.values(items),

    system_admin: Object.values(items),

    department: [
      items.dashboard,
      items.surgeries,
      items.videos,
      items.alerts,
      items.reports,
      items.audit,
      items.ai,
    ],

    doctor: [
      items.dashboard,
      items.surgeries,
      items.videos,
      items.alerts,
      items.audit,
      items.ai,
    ],

    external: [
      items.dashboard,
      items.videos,
      items.audit,
    ],

    student: [
      items.dashboard,
      items.videos,
    ],
  };

  return config[role];
};