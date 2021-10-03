import firebase from "./firebase";
import { AuthContext } from "../context/FirebaseAuthContext";
import React from "react";

const user = React.useContext(AuthContext);
const accountsRef = firebase.database().ref("Accounts/");

export const useAddUser = async () => {
  firebase
    .database()
    .ref("Accounts/" + user?.uid)
    .set({
      Account: user?.uid,
    });

  console.log("User added");
};
