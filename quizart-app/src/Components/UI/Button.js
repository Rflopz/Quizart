import { StyleSheet, Pressable, Text, View } from "react-native";
import { Colors } from "../../Constants/Colors";

const Button = ({ text, children, onPress, color, flat = false }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        !flat && styles.containerBorders,
        color === "primary"
          ? styles.containerPrimary
          : styles.containerSecondary,
      ]}
    >
      <View>
        <Text
          style={[
            styles.text,
            color === "primary" ? styles.textPrimary : styles.textSecondary,
          ]}
        >
          {text}
        </Text>
        {children}
      </View>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
    padding: 12,
  },
  containerBorders: {
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 4,
  },
  containerPrimary: {
    borderColor: Colors.secondary.accent,
  },
  containerSecondary: {
    borderColor: Colors.secondary[500],
  },
  text: {
    textAlign: "center",
    fontSize: 16,
  },
  textPrimary: {
    color: Colors.secondary.accent,
  },
  textSecondary: {
    color: Colors.secondary[500],
  },
});
