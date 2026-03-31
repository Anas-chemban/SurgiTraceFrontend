import { Navigate } from "react-router-dom";
import { useAuthStore } from "../api/authStore";


export const PrivateRoute = ({ children }: any) => {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};