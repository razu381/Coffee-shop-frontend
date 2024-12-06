import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "./firebase_config";

export let AuthContext = createContext();

function AuthProvider({ children }) {
  let [user, setUser] = useState({});
  let [loading, setLoading] = useState(true);

  function createUser(email, pass) {
    return createUserWithEmailAndPassword(auth, email, pass);
  }

  function loginUser(email, pass) {
    return signInWithEmailAndPassword(auth, email, pass);
  }

  useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  let authInfo = {
    user,
    setUser,
    loading,
    createUser,
    loginUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
