import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "./authStore";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

/**
 * 🔐 Attach access token
 */
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().access;

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/**
 * 🔄 Refresh control
 */
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

/**
 * 🔄 Response interceptor
 */
api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    // 🔴 Only handle 401
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { refresh, logout } = useAuthStore.getState();

      // ❌ No refresh token → logout
      if (!refresh) {
        logout();
        return Promise.reject(error);
      }

      // 🔁 If already refreshing → queue requests
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        // ✅ CORRECT ENDPOINT
        const res = await api.post("/accounts/token/refresh/", {
          refresh,
        });

        const newAccess = res.data.access;

        // ✅ update store + localStorage
        useAuthStore.setState({ access: newAccess });
        localStorage.setItem("access", newAccess);

        // ✅ run queued requests
        onRefreshed(newAccess);

        // retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);

      } catch (err: any) {
        // 🔥 ONLY logout if refresh token is invalid
        if (err.response?.status === 401) {
          logout();
        }

        return Promise.reject(err);

      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);