import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../Libs/Colors";
import Title from "./Title";

const Card = ({ title, children, style, titleStyle }) => {
  return (
    <View style={[styles.container, style]}>
      <Title style={titleStyle}>{title}</Title>
      <View>{children}</View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    minHeight: 120,
    paddingHorizontal: 12,
    paddingBottom: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.secondary.accent,
  },
});
