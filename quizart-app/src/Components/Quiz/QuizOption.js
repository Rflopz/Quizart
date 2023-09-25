import { StyleSheet, Text, View } from "react-native";

const QuizOption = ({ label, children }) => {
  return (
    <View style={styles.option}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
};

export default QuizOption;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    textAlign: "center",
  },
  option: {
    marginVertical: 15,
    borderBottomWidth: 1,
    borderColor: "gray",
    justifyContent: "center",
    alignContent: "center",
  },
});
