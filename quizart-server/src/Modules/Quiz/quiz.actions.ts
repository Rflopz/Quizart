import { IDto } from "@interfaces/IDto";
import quizModel from "./quiz.model";

const createQuiz = async (values: Record<string, any>): Promise<IDto> => {
  try {
    const quiz = new quizModel(values);
    const result = await quiz.save();

    return {
      data: { result },
      status: 200,
    };
  } catch (err) {
    return {
      data: { message: err instanceof Error ? err.message : err },
      status: 500,
      error: [],
    };
  }
};

const getQuizDashboard = async (id: string): Promise<IDto> => {
  const quizzes = await quizModel.find({
    userId: id,
  });

  console.log(quizzes);

  return {
    data: { quizzes },
    status: 200,
  };
};

export { createQuiz, getQuizDashboard };
