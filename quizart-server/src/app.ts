import { Hono } from "hono";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";

import connectToMongodb from "@db/mongodb";
import authRoutes from "@auth/auth.routes";
import userRoutes from "@user/user.routes";

const app = new Hono();
connectToMongodb();

app.use("*", logger());
app.use("*", secureHeaders());

app.route("/auth", authRoutes);
app.route("/users", userRoutes);

export default app;
