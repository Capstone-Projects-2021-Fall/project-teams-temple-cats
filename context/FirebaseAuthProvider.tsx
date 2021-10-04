import React, { useEffect, useState } from "react";
import { AuthContext } from "./FirebaseAuthContext";
import firebase from "../utils/firebase";

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<firebase.User | null>(null);

  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      firebase
        .database()
        .ref("Accounts/" + user?.uid)
        .set({
          Account: user?.uid,
          Posts: 0,
        });

      console.log("User added");
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
