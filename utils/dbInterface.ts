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

export function addCat(cat: Cat) {
  firebase
    .database()
    .ref()
    .child("Cats/" + cat.catID)
    .set(cat);
}

export function addPin(pin: Pin) {
  // pin.accountID = <string>firebase.auth().currentUser?.uid;

  firebase
    .database()
    .ref()
    .child("Pins/" + pin.pinID)
    .set(pin);
}
