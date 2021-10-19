import firebase from "./firebase";
import { AuthContext } from "../context/FirebaseAuthContext";
//import { PostContext } from "../context/FirebasePostContext";
import React from "react";
import { Account, Cat, Pin } from "../types";
import { LatLng } from "react-native-maps";

const root = firebase.database().ref();
let reference;

// const user = React.useContext(AuthContext);
//const post = React.useContext(PostContext);
//const accountsRef = firebase.database().ref("Accounts/");
//const post = firebase.database().ref("Posts/")

// export function addAccount(account: Account) {
//   firebase
//     .database()
//     .ref()
//     .child("Accounts/" + account.accountID)
//     .set(account);

//   console.log("User added");
// }

export async function addCat(cat: Cat) {
  firebase
    .database()
    .ref()
    .child("Cats/" + cat.catID)
    .set(cat);
}

export async function addPicture(cat: Cat) {
  const response = await fetch(cat.media)
  const blob = await response.blob();

  firebase
    .storage()
    .ref()
    .child(firebase.auth().currentUser?.uid + "/" + cat.catID)
    .put(blob);
}
