import { StyleSheet, Text, View } from "react-native";

const Title = ({ text, children, style }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, style]}>{text || children}</Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    margin: 12,
    paddingBottom: 6,
  },
  text: {
    textAlign: "center",
    fontSize: 24,
  },
});
