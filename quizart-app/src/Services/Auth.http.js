import { http } from "./http";

export const createAccount = async (user) => {
  const { data, headers } = await http.post("auth/signin", user);
  console.log(headers.authorization);
  return data;
};

export const login = async (email, password) => {
  const { data } = await http.post("auth/login", { email, password });
  return data;
};
