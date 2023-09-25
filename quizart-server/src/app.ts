import { Hono } from "hono";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";

import connectToMongodb from "@db/mongodb";
import authRoutes from "@auth/auth.routes";
import userRoutes from "@user/user.routes";
import quizRoutes from "@quiz/quiz.routes";

const app = new Hono();
try {
  connectToMongodb();
} catch (err) {
  console.log(err);
}

app.use("*", logger());
app.use("*", secureHeaders());

app.route("/auth", authRoutes);
app.route("/users", userRoutes);
app.route("/quiz", quizRoutes);

export default app;
