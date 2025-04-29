import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();
type childrenType = {
  children: JSX.Element;
};
const AuthProvider = ({ children }: childrenType) => {
  const [isAuth, setIsAuth] = useState(false);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  });
  //const obj = useMemo(() => ({ isAuth, auth }), []); // value is cached by useMemo
  return (
    <div>
      <AuthContext.Provider value={{ isAuth, auth }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};
export default AuthProvider;
