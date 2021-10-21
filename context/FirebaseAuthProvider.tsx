import React, { useEffect, useState } from "react";
import { AuthContext } from "./FirebaseAuthContext";
import firebase from "../utils/firebase";

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<firebase.User | null>(null);

  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      const ref = firebase.database().ref("Accounts/");
      ref.once("value").then(function (snapshot) {
        var exists = snapshot.hasChild(firebaseUser?.uid);
        if (exists === false)
          ref.child("Accounts" + firebaseUser?.uid).set(user);
      });
      console.log("User added");
    });
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
