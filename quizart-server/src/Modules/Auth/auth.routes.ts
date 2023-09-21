import { Hono } from "hono";
import { Login, getJwtAuth } from "./auth.actions";
import { CreateUser, GetUserById } from "@user/user.actions";
import { Jwt } from "hono/utils/jwt";
import { IUserModel } from "@user/user.model";

const authRoutes = new Hono();

authRoutes
  .post("/login", async (c) => {
    const { email, password } = await c.req.json();
    const { data, status } = await Login(email, password);
    c.header("authorization", data.jwtoken);

    return c.json(data, status);
  })
  .post("/logout", async (c) => {
    const token = c.req.header("authorization")?.split(" ")[1];

    if (!token) return c.json({ message: "missing Jwtoken" }, 403);

    const { payload } = Jwt.decode(token);

    const user = await GetUserById(payload.id).select(
      "+authentication.sessionToken"
    );

    if (!user) return c.json({ message: "not allowed" }, 404);

    const jwtoken = await getJwtAuth(user as IUserModel);

    c.header("authorization", jwtoken);
    return c.json({ message: "successfuly log out" }, 200);
  })
  .post("/signin", async (c) => {
    const user = await c.req.json();
    const { data, status, error } = await CreateUser(user);

    c.header("authorization", data.jwtoken);

    return c.json(data, status);
  });

export default authRoutes;
