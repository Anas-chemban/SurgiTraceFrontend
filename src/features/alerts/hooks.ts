import { useQuery } from "@tanstack/react-query";
import { getAlerts } from "./api";

export const useAlerts = () => {
  return useQuery({
    queryKey: ["alerts"],
    queryFn: getAlerts,
  });
};