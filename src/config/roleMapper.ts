// src/config/roleMapper.ts


import type { Role } from "../types/auth";
import type { UserRole } from "./sidebarConfig";

export const mapRoleToSidebar = (role: Role): UserRole => {
  switch (role) {
    case "hospital_admin":
      return "hospital_admin";
    case "department_head":
      return "department";
    case "doctor":
      return "doctor";
    case "external_entity":
      return "external";
    case "student":
      return "student";
    case "system_admin":
      return "system_admin";
    default:
      return "doctor";
  }
};