import mongoose, { Document, Schema } from "mongoose";

export interface IQuiz {
  userId: string;
  question: string;
  category: string;
  difficulty: string;
  correct_answer: string;
  incorrect_answers: string[];
  isCorrect: boolean;
  type: string;
}

export interface IQuizModel extends IQuiz, Document {}

const QuizSchema: Schema = new Schema(
  {
    userId: { type: String, require: true },
    quiz: [
      {
        question: { type: String, required: true },
        category: { type: String, required: true },
        difficulty: { type: String, required: true },
        correct_answer: { type: String, required: true },
        incorrect_answer: [{ type: String, required: true }],
        isCorrect: { type: Boolean, required: true },
        type: { type: String, required: true },
      },
    ],
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("Quiz", QuizSchema);
