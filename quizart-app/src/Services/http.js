import axios from "axios";
import { BASE_URL } from "@env";

export const http = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
});
