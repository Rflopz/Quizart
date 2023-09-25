import { StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Colors } from "../Libs/Colors";
import IconButton from "../Components/UI/IconButton";
import useAuthentication from "../Hooks/useAuthentication";
import QuizOptions from "../Screens/quiz/QuizOptions.screen";
import DashboardScreen from "../Screens/dashboard/Dashboard.screen";
import QuizCategories from "../Screens/quiz/QuizCategories.screen";
import QuizScreen from "../Screens/quiz/Quiz.screen";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const { logout } = useAuthentication();
  const handleLogoutPress = () => logout();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary[500],
        },
        headerTintColor: "black",
        contentStyle: {
          backgroundColor: Colors.background.default,
        },
        headerRight: ({ tintColor }) => (
          <View style={styles.iconContainer}>
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={handleLogoutPress}
            />
          </View>
        ),
      }}
    >
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen
        name="QuizCategories"
        component={QuizCategories}
        options={{
          title: "Categories",
        }}
      />
      <Stack.Screen
        name="QuizOptions"
        component={QuizOptions}
        options={{
          title: "Options for quiz",
        }}
      />
      <Stack.Screen
        name="Quiz"
        component={QuizScreen}
        options={{
          title: "",
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
});
