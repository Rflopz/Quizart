import { StyleSheet, View } from "react-native";
import Input from "../UI/Input";

const LoginForm = ({ loginForm, onUpdate }) => {
  return (
    <View style={styles.inputs}>
      <Input
        label="Email"
        name="email"
        value={loginForm.email.value}
        onUpdate={onUpdate}
        placeholder="you@email.com"
      />
      <Input
        label="Password"
        name="password"
        value={loginForm.password.value}
        onUpdate={onUpdate}
        isSecure={true}
        placeholder="Your password"
      />
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  inputs: {
    flex: 1,
  },
});
