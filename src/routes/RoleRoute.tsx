// src/routes/RoleRoute.tsx

import { Navigate, useLocation } from "react-router-dom";

import type { Role } from "../types/auth";
import { useAuthStore } from "../api/authStore";


type Props = {
  children: React.ReactNode;
  allowedRoles: Role[];
};

export const RoleRoute = ({ children, allowedRoles }: Props) => {
  const user = useAuthStore((s) => s.user);
  const isHydrated = useAuthStore((s) => s.isHydrated); // 🔥 ADD
  const location = useLocation();

  // 🔥 WAIT until restore finishes
  if (!isHydrated) {
    return null; // or loading spinner
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role not allowed
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};