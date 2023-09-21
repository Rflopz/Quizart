import { StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../Constants/Colors";

const Input = ({ label, name, onUpdate, isSecure, ...inputProps }) => {
  const handleOnChange = (text) => onUpdate(name, text);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={isSecure}
        onChangeText={handleOnChange}
        {...inputProps}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 12,
  },
  label: {
    marginBottom: 4,
    textAlign: "center",
    fontSize: 16,
    color: Colors.secondary.accent,
  },
  input: {
    padding: 12,
    borderColor: Colors.primary.accent,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 22,
  },
});
