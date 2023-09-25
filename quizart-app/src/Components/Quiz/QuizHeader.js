import { StyleSheet, Text, View } from "react-native";
import Title from "../UI/Title";
import { evalHTMLcode } from "../../Libs/helpers";

const QuizHeader = ({ leftText, question, category, difficulty }) => {
  return (
    <>
      <View style={styles.header}>
        <Text>{leftText}</Text>
        <Text>Skip</Text>
      </View>
      <View style={styles.question}>
        <Title>{evalHTMLcode(question)}</Title>
        <View style={styles.questionAttrs}>
          <Text style={styles.questionAttr}>
            {category} | {difficulty}
          </Text>
        </View>
      </View>
    </>
  );
};

export default QuizHeader;

const styles = StyleSheet.create({
  header: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  questionAttrs: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "center",
    marginHorizontal: 14,
  },
  questionAttr: {
    color: "gray",
    fontSize: 16,
  },
  question: {
    marginTop: 12,
  },
});
