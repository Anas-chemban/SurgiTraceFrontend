// src/store/authStore.ts

import { create } from "zustand";
import type { User } from "../types/auth";

type AuthState = {
  user: User | null;
  access: string | null;
  refresh: string | null;

  login: (data: { access: string; refresh: string; user: User }) => void;
  logout: () => void;
  restore: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  access: null,
  refresh: null,

  login: (data) => {
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    localStorage.setItem("user", JSON.stringify(data.user));

    set(data);
  },

  logout: () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    set({
      user: null,
      access: null,
      refresh: null,
    });

    window.location.href = "/login";
  },

  restore: () => {
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");
    const user = localStorage.getItem("user");

    if (access && refresh && user) {
      set({
        access,
        refresh,
        user: JSON.parse(user),
      });
    }
  },
}));