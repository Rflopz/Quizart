import { Hono } from "hono";
import { isJwtValid } from "@auth/auth.middleware";
import { QuizMock } from "./quiz.mock";

const quizRoutes = new Hono();
const baseurl = "https://opentdb.com";

quizRoutes
  .use("*", isJwtValid)
  .post("/mock", (c) => {
    return c.json({ quiz: QuizMock });
  })
  .post("/", async (c) => {
    const { query } = await c.req.json();
    const response = await fetch(`${baseurl}/api.php${query}`);

    if (response.status !== 200)
      return c.json({ message: "there was an error" }, 500);

    return c.json({ query, quiz: (await response.json()).results });
  })
  .get("/categories", async (c) => {
    const response = await fetch(`${baseurl}/api_category.php`);

    if (response.status !== 200)
      return c.json({ message: "there was an error" }, 500);

    return c.json({
      categories: (await response.json()).trivia_categories,
    });
  });

export default quizRoutes;
