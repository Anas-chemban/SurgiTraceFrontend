import type { Role } from "../types/auth";


export const canViewVideo = (role: Role) => {
  return ["admin", "doctor", "department_head", "external"].includes(role);
};

export const canDownloadVideo = (role: Role) => {
  return ["admin", "external"].includes(role);
};

export const canViewFullVideo = (role: Role) => {
  return ["admin", "doctor", "department_head"].includes(role);
};

export const canViewEducational = (role: Role) => {
  return ["student"].includes(role);
};