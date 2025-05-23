import { app } from "@/firebase";
import { Auth, getAuth } from "firebase/auth";
import React, { useContext } from "react";

const auth = getAuth(app);
interface IAuthContext {
  auth: Auth;
  isAuth: boolean;
}

const defaultState = {
  auth: auth,
  isAuth: true,
};

export const AuthContext = React.createContext<IAuthContext>(defaultState);
export const useAuth = () => {
  const { auth, isAuth } = useContext(AuthContext);

  return { auth, isAuth };
};
