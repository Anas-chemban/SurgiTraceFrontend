import { api } from "../../api/api";


export const loginApi = async (data: {
  email: string;
  password: string;
}) => {
  const res = await api.post("accounts/login/", data);
  return res.data;
};