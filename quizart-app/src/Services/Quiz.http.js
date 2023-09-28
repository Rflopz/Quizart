import { http } from "./http";

export const getAllCategories = async () => {
  const { data } = await http.get("quiz/categories");
  return data;
};

export const getQuizzes = async (ammount, categoryId, difficulty) => {
  const { data } = await http.get(
    `quiz/${categoryId}/${difficulty}/${ammount}`
  );
  return data;
};

export const saveQuizResults = async (quiz) => {
  const { data } = await http.post("quiz", { quiz });
  return data;
};

export const getQuizDashboard = async (id) => {
  const { data } = await http.get(`quiz/dashboard/${id}`);
  return data;
};
