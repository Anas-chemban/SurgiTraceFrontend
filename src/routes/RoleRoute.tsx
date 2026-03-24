import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../app/store";
import type { Role } from "../types/auth";


type Props = {
  children: React.ReactNode;
  allowedRoles: Role[];
};

export const RoleRoute = ({ children, allowedRoles }: Props) => {
  const user = useAuthStore((s) => s.user);
  const location = useLocation();

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