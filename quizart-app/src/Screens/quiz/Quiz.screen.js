import { View, Text, StyleSheet } from "react-native";
import { useAtomValue } from "jotai";
import { quizzesAtom } from "../../Store/Atoms/Quiz.atoms";
import { useEffect, useRef, useState } from "react";
import QuizHeader from "../../Components/Quiz/QuizHeader";
import QuizAnswers from "../../Components/Quiz/QuizAnswers";

const QuizScreen = ({ navigation }) => {
  const questions = useAtomValue(quizzesAtom);
  const [solvedQuestions, setSolvedQuestions] = useState([]);

  const [index, setIndex] = useState(0);
  const [isEnabled, setIsEnabled] = useState(true);
  const [isCorrect, setIsCorrect] = useState(null);
  const current = questions[index];

  useEffect(() => {
    if (solvedQuestions.length === questions.length) {
      setTimeout(() => {
        navigation.replace("QuizSummary", { solvedQuestions });
      }, 1300);
    }
  }, [solvedQuestions]);

  const handleAnswerPress = async (answer) => {
    let _isCorrect = answer === current.correct_answer;

    setIsCorrect(_isCorrect);
    setIsEnabled(false);

    setSolvedQuestions([
      ...solvedQuestions,
      { ...current, isCorrect: _isCorrect },
    ]);

    if (index + 1 < questions.length) {
      setTimeout(() => {
        setIndex((v) => v + 1);
        setIsCorrect(null);
        setIsEnabled(true);
      }, 1500);
    }
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
        {isCorrect !== null &&
          (isCorrect ? (
            <Text style={styles.answerCorrect}>Good job!</Text>
          ) : (
            <View style={styles.wrongContainer}>
              <Text style={styles.answerWrong}>The correct answer is: </Text>
              <Text style={styles.answerWrong}>{current.correct_answer}</Text>
            </View>
          ))}
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
  answerCorrect: {
    textAlign: "center",
    fontSize: 24,
    color: "green",
  },
  answerWrong: {
    color: "red",
    fontSize: 24,
    textAlign: "center",
  },
  wrongContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
  },
});
