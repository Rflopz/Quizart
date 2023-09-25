import { StyleSheet, View } from "react-native";
import Button from "../UI/Button";
import { useSetAtom } from "jotai";
import { quizOptionsAtom } from "../../Store/Atoms/Quiz.atoms";

const DifficultyButtons = ({ selected }) => {
  const setQuizOptions = useSetAtom(quizOptionsAtom);

  const onPress = (value) =>
    setQuizOptions((current) => ({ ...current, difficulty: value }));

  return (
    <View style={styles.difficulty}>
      <Button
        flat
        color="primary"
        textStyle={selected === "" && styles.difficultyButtonText}
        style={styles.difficultyButton}
        onPress={onPress.bind(this, "")}
      >
        Any
      </Button>
      <Button
        flat
        color="primary"
        textStyle={selected === "easy" && styles.difficultyButtonText}
        style={styles.difficultyButton}
        onPress={onPress.bind(this, "easy")}
      >
        Easy
      </Button>
      <Button
        flat
        color="primary"
        textStyle={selected === "medium" && styles.difficultyButtonText}
        style={styles.difficultyButton}
        onPress={onPress.bind(this, "medium")}
      >
        Medium
      </Button>
      <Button
        flat
        color="primary"
        textStyle={selected === "hard" && styles.difficultyButtonText}
        style={styles.difficultyButton}
        onPress={onPress.bind(this, "hard")}
      >
        Hard
      </Button>
    </View>
  );
};

export default DifficultyButtons;

const styles = StyleSheet.create({
  difficulty: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
  },

  difficultyButtonText: {
    color: "#2b7082",
  },
  difficultyButton: {
    minWidth: 100,
    borderColor: "#2b7082",
  },
});
