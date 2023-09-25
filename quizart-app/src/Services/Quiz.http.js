import { http } from "./http";

export const getAllCategories = async () => {
  const { data } = await http.get("quiz/categories");
  return data;
};

export const getQuizzes = async (ammount, categoryId, difficulty) => {
  let query = `?amount=${ammount}`;

  if (categoryId !== 0) query += `&category=${categoryId}`;
  if (difficulty !== "any") query += `&difficulty=${difficulty}`;

  const { data } = await http.post(`quiz`, { query });
  return data;
};
