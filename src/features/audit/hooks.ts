import { useQuery } from "@tanstack/react-query";
import { getAuditLogs } from "./api";

export const useAuditLogs = (filters: any) => {
  return useQuery({
    queryKey: ["auditLogs", filters],
    queryFn: () => getAuditLogs(filters),
  });
};