import React, { createContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";

const FirebaseContext = createContext();
export { FirebaseContext };

const firebaseConfig = {
  apiKey: "AIzaSyDhKqRV1ALg80TdK0GsSFEq0BR6BK8UiPs",
  authDomain: "temple-cats.firebaseapp.com",
  databaseURL: "https://temple-cats-default-rtdb.firebaseio.com",
  projectId: "temple-cats",
  storageBucket: "temple-cats.appspot.com",
  messagingSenderId: "645364453008",
  appId: "1:645364453008:web:e2b6afd21de03516ccd215",
  measurementId: "G-PTQHR7RT4M",
};

export default ({ children }) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  );
};
