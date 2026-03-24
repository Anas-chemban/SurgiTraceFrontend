import { Navigate } from "react-router-dom";
import { useAuthStore } from "../app/store";

export const PrivateRoute = ({ children }: any) => {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};