import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useAuthStore } from "./app/store";

function App() {
  const restore = useAuthStore((s) => s.restore);

  useEffect(() => {
    restore(); // 🔥 auto-login on refresh
  }, []);

  return <AppRoutes />;
}

export default App;