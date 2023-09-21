import { useAtom, useSetAtom } from "jotai";
import { isAuthenticatedAtom, jwtokenAtom } from "../Store/Atoms/Auth.atoms";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect } from "react";
import { userAtom } from "../Store/Atoms/User.atoms";

const useAuthentication = () => {
  const [isAuth, setIsAuth] = useAtom(isAuthenticatedAtom);
  const [jwt, setJwt] = useAtom(jwtokenAtom);
  const setUser = useSetAtom(userAtom);

  const isJwtokenStored = useCallback(async () => {
    const token = await AsyncStorage.getItem("jwtoken");
    const user = await AsyncStorage.getItem("user");

    if (!token) return;

    setIsAuth(!!token);
    setJwt(token);

    setUser(JSON.parse(user));
  }, []);

  const authenticate = (jwtoken, user) => {
    setJwt(jwtoken);
    setIsAuth(!!jwtoken);
    setUser(user);
    AsyncStorage.setItem("jwtoken", jwtoken);
    AsyncStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setJwt("");
    setIsAuth(false);
    setUser({});
    AsyncStorage.removeItem("jwtoken");
    AsyncStorage.removeItem("user");
  };

  return {
    isJwtokenStored,
    logout,
    authenticate,
    jwtoken: jwt,
    isAuthenticated: isAuth,
  };
};

export default useAuthentication;
