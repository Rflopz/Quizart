import { useLayoutEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useAtomValue } from "jotai";

import { isAuthenticatedAtom } from "./src/Store/Atoms/Auth.atoms";
import AuthStack from "./src/Routes/Auth.stack";
import AppStack from "./src/Routes/App.stack";
import useAuthentication from "./src/Hooks/useAuthentication";

export default function App() {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const { isJwtokenStored } = useAuthentication();

  useLayoutEffect(() => {
    isJwtokenStored();
  }, [isJwtokenStored]);

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        {!isAuthenticated ? <AuthStack /> : <AppStack />}
      </NavigationContainer>
    </>
  );
}
