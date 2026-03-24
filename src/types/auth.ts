// src/types/auth.ts

export type Role =
  | "doctor"
  | "hospital_admin"
  | "department_head"
  | "student"
  | "external_entity"
  | "system_admin";

export type User = {
  id: number;
  email: string;
  name: string; // ✅ ADD THIS
  role: Role;
};