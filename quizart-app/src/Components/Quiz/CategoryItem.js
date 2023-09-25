import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../Libs/Colors";
import Button from "../UI/Button";
import { useSetAtom } from "jotai";
import { quizOptionsAtom } from "../../Store/Atoms/Quiz.atoms";
import { useNavigation } from "@react-navigation/native";

const CategoryItem = ({ item }) => {
  const setQuizOptions = useSetAtom(quizOptionsAtom);
  const navigation = useNavigation();

  const onPress = ({ id, name }) => {
    setQuizOptions((current) => ({ ...current, category: { id, name } }));
    navigation.navigate("QuizOptions");
  };

  return (
    <View style={styles.container}>
      <Button color="primary" onPress={onPress.bind(this, item)}>
        {item.name}
      </Button>
    </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background.default,
    marginHorizontal: 16,
  },
});
