import { Hono } from "hono";

import {
  DeleteUserById,
  GetAllUsers,
  GetUserById,
  UpdateUserById,
} from "./user.actions";

import { isIdOwner } from "./user.middlewares";
import { isJwtValid } from "@auth/auth.middleware";

const userRoutes = new Hono();

userRoutes
  .use("*", isJwtValid)
  .use("/:id", isIdOwner)

  .get("/", async (c) => c.json(await GetAllUsers()))
  .get("/:id", async (c) => c.json(await GetUserById(c.req.param("id"))))
  .delete("/:id", async (c) => c.json(await DeleteUserById(c.req.param("id"))))
  .put("/:id", async (c) =>
    c.json(await UpdateUserById(c.req.param("id"), await c.req.json()))
  );

export default userRoutes;
