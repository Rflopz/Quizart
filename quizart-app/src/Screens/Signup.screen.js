import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import Input from "../Components/UI/Input";
import Button from "../Components/UI/Button";
import { createAccount } from "../Services/Auth.http";
import LoadingOverlay from "../Components/UI/LoadingOverlay";
import useAuthentication from "../Hooks/useAuthentication";
import SignupForm from "../Components/Auth/SignupForm.component";

const initSignupForm = {
  email: { value: "", isValid: true },
  name: { value: "", isValid: true },
  password: { value: "", isValid: true },
};

const SignupScreen = ({ navigation }) => {
  const [signupForm, setSignupForm] = useState(initSignupForm);
  const [isLoading, setIsLoading] = useState(false);
  const { authenticate } = useAuthentication();

  const goToLogin = () => navigation.replace("login");
  const onUpdate = (name, value) => {
    setSignupForm((current) => ({
      ...current,
      [name]: { value, isValid: true },
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const { jwtoken, ...user } = await createAccount({
        email: signupForm.email.value,
        username: signupForm.name.value,
        password: signupForm.password.value,
      });
      authenticate(jwtoken, user);
    } catch (error) {
      Alert.alert("Sign up error", "there was an error");
      setIsLoading(false);
    }
  };

  if (isLoading)
    return <LoadingOverlay message="Creating user and signing in" />;

  return (
    <View style={styles.container}>
      <SignupForm signupForm={signupForm} onUpdate={onUpdate} />
      <View style={styles.buttons}>
        <Button flat text="Go to login" onPress={goToLogin} />
        <Button
          text="Submit and login"
          color="primary"
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 32,
    justifyContent: "center",
    alignContent: "center",
  },
  inputs: {
    flex: 1,
  },
  buttons: {
    flex: 1,
    marginTop: 32,
  },
});
