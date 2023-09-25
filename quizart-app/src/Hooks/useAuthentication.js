import { useCallback } from "react";
import { useAtom, useSetAtom } from "jotai";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { isAuthenticatedAtom, jwtokenAtom } from "../Store/Atoms/Auth.atoms";
import { userAtom } from "../Store/Atoms/User.atoms";
import { http } from "../Services/http";

const useAuthentication = () => {
  const [isAuth, setIsAuth] = useAtom(isAuthenticatedAtom);
  const [jwt, setJwt] = useAtom(jwtokenAtom);
  const setUser = useSetAtom(userAtom);

  const updateHttpHeader = (token) => {
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const isJwtokenStored = useCallback(async () => {
    const token = await AsyncStorage.getItem("jwtoken");
    const user = await AsyncStorage.getItem("user");

    if (!token) return;

    setIsAuth(!!token);
    setJwt(token);
    setUser(JSON.parse(user));

    updateHttpHeader(token);
  }, []);

  const authenticate = (jwtoken, user) => {
    setJwt(jwtoken);
    setIsAuth(!!jwtoken);
    setUser(user);
    AsyncStorage.setItem("jwtoken", jwtoken);
    AsyncStorage.setItem("user", JSON.stringify(user));

    updateHttpHeader(jwtoken);
  };

  const logout = () => {
    setJwt("");
    setIsAuth(false);
    setUser({});
    AsyncStorage.removeItem("jwtoken");
    AsyncStorage.removeItem("user");
    updateHttpHeader("");
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
