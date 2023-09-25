import { View, Text, StyleSheet } from "react-native";
import { useAtomValue } from "jotai";
import { quizzesAtom } from "../../Store/Atoms/Quiz.atoms";
import { useEffect, useRef, useState } from "react";
import QuizHeader from "../../Components/Quiz/QuizHeader";
import QuizAnswers from "../../Components/Quiz/QuizAnswers";

const QuizScreen = () => {
  const questions = useAtomValue(quizzesAtom);

  const [index, setIndex] = useState(0);
  const [isEnabled, setIsEnabled] = useState(true);
  const current = questions[index];

  const [isCorrect, setIsCorrect] = useState(null);

  const nextQuestion = () => {
    if (index + 1 < questions.length) {
      setIndex((v) => v + 1);
      setIsCorrect(null);
      setIsEnabled(true);
    } else setIndex(0);
  };

  const handleAnswerPress = (answer) => {
    setIsCorrect(answer === current.correct_answer);
    setIsEnabled(false);

    setTimeout(() => {
      nextQuestion();
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <QuizHeader
          leftText={`${index + 1} / ${questions.length}`}
          {...current}
        />
      </View>
      <View style={styles.answers}>
        <QuizAnswers
          isEnabled={isEnabled}
          correct={current.correct_answer}
          incorrects={current.incorrect_answers}
          max={questions.length}
          onPress={handleAnswerPress}
        />
      </View>
      <View style={styles.answers}>
        <Text
          style={[
            styles.answerFeedback,
            isCorrect ? styles.answerCorrect : styles.answerWrong,
          ]}
        >
          {isCorrect !== null &&
            (isCorrect
              ? "Correct!"
              : `The correct answer is: ${current.correct_answer}`)}
        </Text>
      </View>
    </View>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 24,
  },
  header: {
    flex: 1,
  },
  answers: {
    justifyContent: "center",
    flex: 1,
    margin: 14,
  },
  answerFeedback: {
    fontSize: 24,
  },
  answerCorrect: {
    color: "green",
  },
  answerWrong: {
    color: "red",
  },
});
