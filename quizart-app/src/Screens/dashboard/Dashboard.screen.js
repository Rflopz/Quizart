import { useAtomValue } from "jotai";
import { userAtom } from "../../Store/Atoms/User.atoms";
import Button from "../../Components/UI/Button";
import IconButton from "../../Components/UI/IconButton";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import Card from "../../Components/UI/Card";
import { getQuizDashboard } from "../../Services/Quiz.http";
import { useIsFocused } from "@react-navigation/native";
const { View, Text, StyleSheet } = require("react-native");

const DashboardScreen = ({ navigation, route }) => {
  const user = useAtomValue(userAtom);
  const [data, setData] = useState();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (user) handleRefresh();
  }, [user, isFocused]);

  const handleRefresh = async () => {
    const result = await getQuizDashboard(user._id);
    setData(result);
  };

  const gotoQuizOptions = () => navigation.navigate("QuizOptions");
  const CapitalizedName = useMemo(
    () => user && user?.username?.replace(/^./, user.username[0].toUpperCase()),
    [user]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome {CapitalizedName}</Text>
        <IconButton icon="reload" size={24} onPress={handleRefresh} />
      </View>
      <View style={styles.carts}>
        {data ? (
          <>
            <Card title="Average score">
              <Text style={styles.score}>{data?.score.toFixed(2)}</Text>
            </Card>
            <Card
              title={`${data?.totalQuizzes} Quizzes, ${data?.totalQuestions} Questions`}
            >
              <View style={styles.totals}>
                <Text style={styles.title}>Correct by categories</Text>

                {data?.summary
                  .sort((a, b) => b.nCorrectQuestions - a.nCorrectQuestions)
                  .map((value) => (
                    <Text key={value.category}>
                      {value.nCorrectQuestions} {value.category}
                    </Text>
                  ))}
              </View>
            </Card>
          </>
        ) : (
          <Card title="There is no data yet. ">
            <Text style={styles.message}>Do quizzes and have fun</Text>
          </Card>
        )}
      </View>
      <View style={styles.buttons}>
        <Button text="Quiz me out" onPress={gotoQuizOptions} />
      </View>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    margin: 12,
    paddingBottom: 20,
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 22,
  },
  carts: {
    flex: 1,
  },
  buttons: {
    justifyContent: "center",
  },
  header: {
    margin: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totals: {
    marginLeft: "10%",
  },
  message: {
    textAlign: "center",
    fontSize: 18,
  },
  score: {
    textAlign: "center",
    fontSize: 50,
  },
});
