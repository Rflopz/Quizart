import { StyleSheet, Text, View } from "react-native";
import Title from "../../Components/UI/Title";
import Button from "../../Components/UI/Button";
import { Colors } from "../../Libs/Colors";
import { useEffect } from "react";
import { saveQuizResults } from "../../Services/Quiz.http";
import { useAtomValue } from "jotai";
import { userAtom } from "../../Store/Atoms/User.atoms";

const QuizSummaryScreen = ({ route, navigation }) => {
  const { solvedQuestions } = route.params;
  const user = useAtomValue(userAtom);

  const correct = solvedQuestions.filter((x) => x.isCorrect);

  const totalCategories = new Set(solvedQuestions.map((item) => item.category));
  const totalDiff = new Set(solvedQuestions.map((item) => item.difficulty));

  useEffect(() => {
    if (solvedQuestions)
      saveQuizResults({ quiz: solvedQuestions, userId: user._id });
  }, [solvedQuestions]);

  const gotoDashboard = () =>
    navigation.navigate("Dashboard", { refresh: true });
  const gotoQuizOptions = () => navigation.replace("QuizOptions");

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.span}>
          <Text style={styles.number}>{solvedQuestions.length}</Text> total of
          question
        </Text>
        <Text style={styles.span}>
          <Text style={styles.number}>{totalCategories.size}</Text> total
          categories
        </Text>
        <Text style={styles.span}>
          <Text style={styles.number}>{totalDiff.size}</Text> total difficulties
        </Text>
      </View>
      <View>
        <Title>Your score is: </Title>
        <Text style={styles.score}>
          {((correct.length * 100) / solvedQuestions.length).toFixed(2)}
        </Text>
      </View>
      <View>
        <Button onPress={gotoQuizOptions}>Do another quiz</Button>
        <Button onPress={gotoDashboard} flat color="primary">
          Go to dashboard
        </Button>
      </View>
    </View>
  );
};

export default QuizSummaryScreen;

const styles = StyleSheet.create({
  container: {
    margin: 14,
    flex: 1,
    justifyContent: "space-around",
  },
  span: {
    fontSize: 16,
    textAlign: "center",
  },
  score: {
    fontSize: 64,
    textAlign: "center",
    fontWeight: "800",
  },
  number: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.secondary[500],
  },
});
