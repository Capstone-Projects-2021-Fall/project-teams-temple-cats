import firebase from "./firebase";
import { AuthContext } from "../context/FirebaseAuthContext";
//import { PostContext } from "../context/FirebasePostContext";
import React from "react";

const user = React.useContext(AuthContext);
//const post = React.useContext(PostContext);
//const accountsRef = firebase.database().ref("Accounts/");
//const post = firebase.database().ref("Posts/")

export const useAddUser = async () => {
  firebase
    .database()
    .ref("Accounts/" + user?.uid)
    .set({
      Account: user?.uid,
    });

  console.log("User added");
};


/*
export const useAddPost = async () => {
  firebase
  .database()
  .ref("Posts/" + post?.uid)
  .set({
    Post: post?.uid,
  });
  console.log("Post added");
};*/

