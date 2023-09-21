import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import Button from "../Components/UI/Button";
import LoadingOverlay from "../Components/UI/LoadingOverlay";
import LoginForm from "../Components/Auth/LoginForm.component";
import { login } from "../Services/Auth.http";
import useAuthentication from "../Hooks/useAuthentication";

const initLoginForm = {
  email: { value: "", isValid: true },
  password: { value: "", isValid: true },
};

const LoginScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(initLoginForm);
  const { authenticate } = useAuthentication();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const { jwtoken, ...user } = await login(
        loginForm.email.value,
        loginForm.password.value
      );
      authenticate(jwtoken, user);
    } catch (error) {
      console.log(error);
      Alert.alert("Authentication failed", "Please check your credentials");
      setIsLoading(false);
    }
  };

  const toSignUp = () => navigation.replace("signup");
  function onUpdate(name, value) {
    setLoginForm((current) => ({
      ...current,
      [name]: { value, isValid: true },
    }));
  }

  if (isLoading) return <LoadingOverlay message="Authenticating" />;

  return (
    <View style={styles.container}>
      <LoginForm loginForm={loginForm} onUpdate={onUpdate} />
      <View style={styles.buttons}>
        <Button text="Create an account" flat onPress={toSignUp} />
        <Button color="primary" text="Log in" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    margin: 32,
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  buttons: {
    flex: 1,
  },
  inputs: {
    flex: 1,
  },
});
