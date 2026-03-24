
import { api } from "../../api/api";
import type { Surgery } from "../../types/surgery";


export const getSurgeries = async (): Promise<Surgery[]> => {
  const res = await api.get("surgeries/");
  return res.data;
};

export const getSurgery = async (id: string): Promise<Surgery> => {
  const res = await api.get(`surgeries/${id}/`);
  return res.data;
};

export const createSurgery = async (data: Partial<Surgery>) => {
  const res = await api.post("surgeries/", data);
  return res.data;
};

export const updateSurgery = async (id: number, data: Partial<Surgery>) => {
  const res = await api.put(`surgeries/${id}/`, data);
  return res.data;
};

export const deleteSurgery = async (id: number) => {
  return api.delete(`surgeries/${id}/`);
};