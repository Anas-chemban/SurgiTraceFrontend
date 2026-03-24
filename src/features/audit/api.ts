
import { api } from "../../api/api";
import type { AuditLog } from "../../types/audit";


export const getAuditLogs = async (params?: any): Promise<AuditLog[]> => {
  const res = await api.get("audit/logs/", { params });
  return res.data;
};