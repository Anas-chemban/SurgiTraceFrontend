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
 * UI Role Types (used for sidebar rendering)
 * ⚠️ These are NOT backend roles directly
 */
export type UserRole =
  | "hospital_admin"
  | "department"
  | "doctor"
  | "external"
  | "student"
  | "system_admin";

/**
 * ALL MENU ITEMS (single source of truth)
 */
const allItems = {
  dashboard: {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  surgeries: {
    label: "Surgeries",
    icon: Scissors,
    path: "/surgeries",
  },
  videos: {
    label: "Videos",
    icon: Video,
    path: "/videos",
  },
  alerts: {
    label: "Alerts",
    icon: Bell,
    path: "/alerts",
  },
  reports: {
    label: "Reports",
    icon: FileText,
    path: "/reports",
  },
  audit: {
    label: "Audit Logs",
    icon: ClipboardList,
    path: "/audit",
  },
  ai: {
    label: "AI Analysis",
    icon: Brain,
    path: "/ai",
  },
  users: {
    label: "Users & Depts",
    icon: Users,
    path: "/users",
  },
  settings: {
    label: "Settings",
    icon: Settings,
    path: "/settings",
  },
};

/**
 * ROLE → SIDEBAR MAPPING
 */
export const roleSidebar: Record<UserRole, SidebarItem[]> = {
  hospital_admin: [
    allItems.dashboard,
    allItems.surgeries,
    allItems.videos,
    allItems.alerts,
    allItems.reports,
    allItems.audit,
    allItems.ai,
    allItems.users,
    allItems.settings,
  ],

  department: [
    allItems.dashboard,
    allItems.surgeries,
    allItems.videos,
    allItems.alerts,
    allItems.reports,
    allItems.ai,
  ],

  doctor: [
    allItems.dashboard,
    allItems.surgeries,
    allItems.videos,
    allItems.alerts,
    allItems.ai,
  ],

  external: [
    allItems.dashboard,
    allItems.videos,
    allItems.audit,
  ],

  student: [
    allItems.dashboard,
    allItems.videos,
  ],

  system_admin: [
    allItems.dashboard,
    allItems.surgeries,
    allItems.videos,
    allItems.alerts,
    allItems.reports,
    allItems.audit,
    allItems.ai,
    allItems.users,
    allItems.settings,
  ],
};