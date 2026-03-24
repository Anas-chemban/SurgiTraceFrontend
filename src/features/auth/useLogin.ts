import { useMutation } from "@tanstack/react-query";
import { loginApi } from "./api";
import { useAuthStore } from "../../app/store";

export const useLogin = () => {
  const login = useAuthStore((s) => s.login);

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      login(data); // 🔥 store everything
    },
  });
};