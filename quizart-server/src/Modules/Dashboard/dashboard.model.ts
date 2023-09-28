import mongoose, { Document, Schema } from "mongoose";

export interface IDashboard {
  userId: string;
  score: number;
  totalQuizzes: Number;
  totalQuestions: Number;
  summary: { nCorrectQuestions: number; category: string }[];
}

export interface IDashboardModel extends IDashboard, Document {}

const DashboardSchema = new Schema(
  {
    userId: { type: String, required: true },
    score: { type: Number, required: true },
    totalQuizzes: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    summary: [
      {
        nCorrectQuestions: { type: Number, required: true },
        category: { type: String, required: true },
      },
    ],
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("Dashboard", DashboardSchema);
