import { StyleSheet, View } from "react-native";
import Input from "../UI/Input";

const SignupForm = ({ signupForm, onUpdate }) => {
  return (
    <View style={styles.inputs}>
      <Input
        label="Email"
        name="email"
        value={signupForm.email.value}
        placeholder="you@email.com"
        onUpdate={onUpdate}
      />
      <Input
        label="Name"
        name="name"
        value={signupForm.name.value}
        placeholder="Your name"
        onUpdate={onUpdate}
      />
      <Input
        label="Password"
        name="password"
        value={signupForm.password.value}
        isSecure
        placeholder="strong password"
        onUpdate={onUpdate}
      />
    </View>
  );
};

export default SignupForm;

const styles = StyleSheet.create({
  inputs: {
    flex: 1,
  },
});
