import { StyleSheet, Text, TextInput, View } from "react-native";
import Button from "../../Components/UI/Button";
import { useAtom, useSetAtom } from "jotai";
import { quizOptionsAtom, quizzesAtom } from "../../Store/Atoms/Quiz.atoms";
import DifficultyButtons from "../../Components/Quiz/DifficultyButtons";
import QuizOption from "../../Components/Quiz/QuizOption";
import { getQuizzes } from "../../Services/Quiz.http";
import { evalHTMLcode } from "../../Libs/helpers";

const QuizOptions = ({ navigation }) => {
  const gotoChooseCategory = () => navigation.navigate("QuizCategories");
  const [quizOptions, setQuizOptions] = useAtom(quizOptionsAtom);
  const setQuizzes = useSetAtom(quizzesAtom);

  const onStartQuiz = async () => {
    console.log("quizOptions", quizOptions);
    const result = await getQuizzes(
      quizOptions.numQuestions,
      quizOptions.category.id,
      quizOptions.difficulty
    );

    console.log(result);

    const quiz = result.quiz.map((quiz) => {
      return {
        ...quiz,
        question: evalHTMLcode(quiz.question),
        correct_answer: evalHTMLcode(quiz.correct_answer),
        incorrect_answers: quiz.incorrect_answers.map((answer) =>
          evalHTMLcode(answer)
        ),
      };
    });

    setQuizzes(quiz);
    navigation.replace("Quiz");
  };

  const handleChange = (v) => {
    setQuizOptions((current) => ({ ...current, numQuestions: v }));
  };

  return (
    <View style={styles.container}>
      <QuizOption label="Category">
        <Button flat color="primary" onPress={gotoChooseCategory}>
          <Text>{quizOptions.category.name}</Text>
        </Button>
      </QuizOption>
      <QuizOption label="Difficulty">
        <DifficultyButtons selected={quizOptions.difficulty} />
      </QuizOption>
      <QuizOption label="Num of questions">
        <TextInput
          maxLength={2}
          value={quizOptions.numQuestions.toString()}
          style={styles.textInput}
          keyboardType="number-pad"
          onChangeText={handleChange}
        />
      </QuizOption>

      <Button text="Start quiz" onPress={onStartQuiz} />
    </View>
  );
};

export default QuizOptions;

const styles = StyleSheet.create({
  container: {
    margin: 16,
    paddingBottom: 15,
    flex: 1,
  },
  textInput: {
    textAlign: "center",
    margin: 12,
    paddingTop: 12,
  },
  label: {
    fontSize: 16,
    textAlign: "center",
  },
  option: {
    marginVertical: 15,
    borderBottomWidth: 1,
    borderColor: "lightgray",
    justifyContent: "center",
    alignContent: "center",
  },
});
