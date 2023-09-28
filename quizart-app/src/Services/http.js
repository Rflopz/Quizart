import axios from "axios";

export const http = axios.create({
  baseURL: "http://192.168.0.183:3030/",
  timeout: 2000,
});
