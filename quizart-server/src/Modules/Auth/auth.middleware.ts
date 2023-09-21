import { Context, Next } from "hono";
import { Jwt } from "hono/utils/jwt";
import { jwt } from "hono/jwt";
import { GetUserById } from "@user/user.actions";

export const isJwtValid = async (c: Context, next: Next) => {
  const token = c.req.header("authorization")?.split(" ")[1];

  if (!token) return c.json({ message: "Not allowed" }, 403);
  const sessionToken = Jwt.decode(token);

  const user = await GetUserById(sessionToken.payload.id).select(
    "+authentication.sessionToken"
  );

  if (!user) return c.json({ message: "Not found" }, 404);

  const jwtNext = jwt({ secret: user.authentication.sessionToken });
  return jwtNext(c, next);
};
