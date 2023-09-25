import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../Screens/authentication/Login.screen";
import SignupScreen from "../Screens/authentication/Signup.screen";
import { Colors } from "../Libs/Colors";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary[500],
        },
        contentStyle: {
          backgroundColor: Colors.background.default,
        },
      }}
    >
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{ title: "Welcome" }}
      />
      <Stack.Screen
        name="signup"
        component={SignupScreen}
        options={{
          title: "Create an account",
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
