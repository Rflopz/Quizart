import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Screens/Home.screen";
import { Colors } from "../Constants/Colors";
import IconButton from "../Components/UI/IconButton";
import { useSetAtom } from "jotai";
import {
  isAuthenticatedAtom,
  jwtokenAtom,
  logout,
} from "../Store/Atoms/Auth.atoms";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const setIsAuthenticated = useSetAtom(isAuthenticatedAtom);
  const setJwtoken = useSetAtom(jwtokenAtom);

  const handleLogoutPress = () => {
    setIsAuthenticated(false);
    setJwtoken("");
  };

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
          <IconButton
            icon="exit"
            color={tintColor}
            size={24}
            onPress={handleLogoutPress}
          />
        ),
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
