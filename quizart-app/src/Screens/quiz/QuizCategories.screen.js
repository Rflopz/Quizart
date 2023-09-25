import { useLayoutEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useAtom } from "jotai";

import { categoriesAtom } from "../../Store/Atoms/Quiz.atoms";
import { getAllCategories } from "../../Services/Quiz.http";
import Title from "../../Components/UI/Title";
import CategoryItem from "../../Components/Quiz/CategoryItem";

const QuizCategories = () => {
  const [categories, setCategories] = useAtom(categoriesAtom);

  async function fetchCategories() {
    const result = await getAllCategories();
    setCategories(result.categories);
  }

  useLayoutEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [categories]);

  return (
    <View style={styles.list}>
      <Title> Select category</Title>
      <FlatList
        data={[{ id: 0, name: "Any" }, ...categories]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CategoryItem item={item} />}
      />
    </View>
  );
};

export default QuizCategories;

const styles = StyleSheet.create({
  list: {
    flex: 1,
    marginBottom: 50,
  },
});
