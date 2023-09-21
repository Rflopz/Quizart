import { IAuthentication } from "@auth/auth.interfaces";
import crypto from "crypto";

export const getRandom = () => crypto.randomBytes(128).toString("base64");
export const getHash = (salt: string, password: string) =>
  crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(Bun.env.SECRET_AUTH || "")
    .digest("hex");

export const isValidHash = (auth: IAuthentication, password: string) =>
  auth.password === getHash(auth.salt, password);
