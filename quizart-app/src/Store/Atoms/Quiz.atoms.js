import { atom } from "jotai";

export const quizzesAtom = atom([]);
export const categoriesAtom = atom([]);
export const quizOptionsAtom = atom({
  category: { id: 0, name: "Any" },
  difficulty: "medium",
  numQuestions: 10,
});
