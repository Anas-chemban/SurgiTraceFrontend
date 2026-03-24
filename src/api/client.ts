import axios from "axios";
import { useAuthStore } from "../app/store";

export const api = axios.create({
  baseURL: "http://localhost:8000/",
});

// 🔐 Attach access token
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().access;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 🔄 Handle expired token
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refresh = useAuthStore.getState().refresh;

      try {
        const res = await axios.post(
          "http://localhost:8000/accounts/refresh/",
          { refresh }
        );

        const newAccess = res.data.access;

        // update store
        useAuthStore.setState({ access: newAccess });
        localStorage.setItem("access", newAccess);

        // retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        return api(originalRequest);
      } catch (err) {
        // refresh failed → logout
        useAuthStore.getState().logout();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);