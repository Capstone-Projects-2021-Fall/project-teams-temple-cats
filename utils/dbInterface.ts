import firebase from "./firebase";
import React from "react";
import { Account, Cat, Pin } from "../types";
import { LatLng } from "react-native-maps";

const root = firebase.database().ref();
let reference;

export function addCat (cat: Cat) {
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
