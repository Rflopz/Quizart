import { Hono } from "hono";
import { isJwtValid } from "@auth/auth.middleware";
import { QuizMock } from "./quiz.mock";
import { createQuiz, getQuizDashboard } from "./quiz.actions";
import { getDashboard, setDashboard } from "../Dashboard/dashboard.actions";

const quizRoutes = new Hono();
const baseurl = "https://opentdb.com";

quizRoutes
  .use("*", isJwtValid)
  .post("/mock", (c) => {
    return c.json({ quiz: QuizMock });
  })
  .post("/", async (c) => {
    const { quiz } = await c.req.json();
    const result = await createQuiz(quiz);

    await setDashboard(quiz.userId, quiz.quiz);

    return c.json({ result });
  })
  .get("/dashboard/:id", async (c) => {
    const { id } = c.req.param();

    const dashboard = await getDashboard(id);

    return c.json(dashboard, 200);
  })
  .get("/:category/:difficulty/:amount", async (c) => {
    const { category, difficulty, amount } = c.req.param();

    let query = `?amount=${amount || 10}`;

    if (category !== "0") query += `&category=${category}`;
    if (difficulty !== "0") query += `&difficulty=${difficulty}`;

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
