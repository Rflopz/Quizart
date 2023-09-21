import { useAtomValue } from "jotai";
import { userAtom } from "../Store/Atoms/User.atoms";

const { View, Text } = require("react-native");

const HomeScreen = () => {
  const user = useAtomValue(userAtom);
  console.log(user);
  return (
    <View>
      <Text>hello home {user.username}</Text>
    </View>
  );
};

export default HomeScreen;
