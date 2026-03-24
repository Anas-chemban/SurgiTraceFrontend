// src/api/users.ts

import { api } from "./api";



export const getUsers = async () => {
  const res = await api.get("/accounts/users/");
  return res.data;
};

export const addUser = async (data: {
  name: string;
  email: string;
  role: string;
}) => {
  const res = await api.post("/accounts/users/", data);
  return res.data;
};