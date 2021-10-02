import React, { useEffect, useState } from "react";
import { AuthContext } from "./FirebaseAuthContext";
import firebase from "../utils/firebase";

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      console.log(firebaseUser);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
