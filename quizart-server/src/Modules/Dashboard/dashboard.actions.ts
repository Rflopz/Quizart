import { IQuiz } from "@quiz/quiz.model";
import dashboardModel, { IDashboard } from "./dashboard.model";

export const getDashboard = (userId: string) =>
  dashboardModel.findOne({ userId });

const getSummary = (
  categories: Set<String>,
  quiz: IQuiz[]
): Promise<IDashboard["summary"]> => {
  return new Promise((res, rej) => {
    const summary: IDashboard["summary"] = [];
    for (let c of categories) {
      const category = quiz.filter((q) => q.category == c && q.isCorrect);

      if (category.length > 0)
        summary.push({
          nCorrectQuestions: category.length,
          category: c.toString(),
        });
    }

    res(summary);
  });
};

export const setDashboard = async (userId: string, quiz: IQuiz[]) => {
  try {
    const corrects = quiz.filter((question) => question.isCorrect);
    const score = (corrects.length * 100) / quiz.length;
    const categories = new Set(quiz.map((q) => q.category));
    let summary = await getSummary(categories, quiz);
    const current = await getDashboard(userId);

    if (!current) {
      const dashboard = new dashboardModel({
        userId,
        score,
        totalQuestions: quiz.length,
        totalQuizzes: 1,
        summary,
      });

      const result = await dashboard.save();
      return result;
    }

    current.score =
      current.score + ((score - current.score) / current.totalQuizzes + 1);
    current.totalQuestions = current.totalQuestions + quiz.length;
    current.totalQuizzes = current.totalQuizzes + 1;
    current.summary = current.summary.map((item) => {
      const find = summary.find((x) => x.category == item.category);
      summary = summary.filter((item) => item.category !== find?.category);

      console.log("find in summary", find);
      if (find !== undefined) item.nCorrectQuestions += find.nCorrectQuestions;
      return item;
    });

    console.log("summary left", summary);
    current.summary = [...current.summary, ...summary];

    const result = await current.save();
    return result;
  } catch (err) {
    console.log(err);
  }
};
