import firebase from "./firebase";
import { AuthContext } from "../context/FirebaseAuthContext";
//import { PostContext } from "../context/FirebasePostContext";
import React from "react";
import { Account, Cat, Pin, User } from "../types";
import { LatLng } from "react-native-maps";

const root = firebase.database().ref();
let reference;

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

export function addUser(id: User['accountID'], email: User['email'], photo: User['photo']){
  firebase
  .database()
  .ref()
  .child("Accounts/" + id)
  .set({
    accountID: id,
    email: email,
    photo: photo,
    posts: 0,
    modStatus: false,
    banStatus: false,
  });
}

