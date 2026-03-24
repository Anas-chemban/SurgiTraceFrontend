// src/App.tsx

import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useAuthStore } from "./api/authStore";



function App() {
  const restore = useAuthStore((s) => s.restore);
  const isHydrated = useAuthStore((s) => s.isHydrated);

  useEffect(() => {
    restore();
  }, []);

  // 🔥 WAIT BEFORE RENDER
  if (!isHydrated) {
    return <div>Loading...</div>;
  }

  return <AppRoutes />;
}

export default App;