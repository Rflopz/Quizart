import { useAtomValue } from "jotai";
import { userAtom } from "../../Store/Atoms/User.atoms";
import Button from "../../Components/UI/Button";
import { useMemo } from "react";
const { View, Text, StyleSheet } = require("react-native");

const DashboardScreen = ({ navigation }) => {
  const user = useAtomValue(userAtom);

  const gotoQuizOptions = () => navigation.navigate("QuizOptions");
  const CapitalizedName = useMemo(
    () => user && user?.username?.replace(/^./, user.username[0].toUpperCase()),
    [user]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {CapitalizedName}</Text>
      <Button text="Quiz me out" onPress={gotoQuizOptions} />
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    margin: 16,
    flex: 1,
  },
  title: {
    fontSize: 22,
  },
});
