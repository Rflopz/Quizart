import { Context, Next } from "hono";
import { Jwt } from "hono/utils/jwt";

export const isIdOwner = async (c: Context, next: Next) => {
  const { id } = c.req.param();
  const token = c.req.header("authorization")?.split(" ")[1];

  if (!token) return c.json({ message: "Not allowed, missing token" }, 403);

  const { payload } = Jwt.decode(token);

  if (payload.id !== id)
    return c.json({ message: "Not allowed, not owner" }, 403);

  await next();
};
