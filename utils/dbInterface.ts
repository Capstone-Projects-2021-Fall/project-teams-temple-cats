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

export function addPin (pin: Pin) {
  firebase
    .database()
    .ref()
    .child("Pins/" + pin.pinID)
    .set(pin);
}
