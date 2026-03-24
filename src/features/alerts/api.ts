
import { api } from "../../api/api";
import type { Alert } from "../../types/alert";


export const getAlerts = async (): Promise<Alert[]> => {
  const res = await api.get("alerts/");
  return res.data;
};