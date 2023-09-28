import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { sortRandomly } from "../../Libs/helpers";
import Button from "../UI/Button";

const QuizAnswers = ({ correct, incorrects, max, onPress, isEnabled }) => {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    setAnswers(sortRandomly([correct, ...incorrects], max));
  }, [correct, incorrects]);

  const handleAnswerPress = (item) => {
    setAnswers((currrent) =>
      currrent.map((x) => {
        if (x.answer === item.answer)
          return { ...item, isCorrect: item.answer === correct };
        return x;
      })
    );
    onPress(item.answer);
  };

  return answers.map((item) => (
    <Button
      key={item.answer}
      color="primary"
      isEnable={isEnabled}
      style={
        item.isCorrect !== null &&
        (item.isCorrect ? styles.success : styles.wrong)
      }
      textStyle={
        item.isCorrect !== null &&
        (item.isCorrect ? styles.successText : styles.wrongText)
      }
      onPress={handleAnswerPress.bind(this, item)}
    >
      {item.answer}
    </Button>
  ));
};

export default QuizAnswers;

const styles = StyleSheet.create({
  success: {
    backgroundColor: "#5cc05c",
    borderColor: "#398c39",
  },
  successText: {
    color: "black",
  },
  wrong: {
    backgroundColor: "#d73e3e",
    borderColor: "#930303",
  },
  wrongText: {
    color: "white",
  },
});
