import "@firebase/database";
import "@firebase/auth";
import "@firebase/app";
import firebase from "firebase";

/**
 * Config object for connection to firebase
 */
const firebaseConfig = {
  apiKey: "AIzaSyDhKqRV1ALg80TdK0GsSFEq0BR6BK8UiPs",
  authDomain: "temple-cats.firebaseapp.com",
  databaseURL: "https://temple-cats-default-rtdb.firebaseio.com",
  projectId: "temple-cats",
  storageBucket: "temple-cats.appspot.com",
  messagingSenderId: "645364453008",
  appId: "1:645364453008:web:e2b6afd21de03516ccd215",
  measurementId: "G-PTQHR7RT4M"
};

connectToFirebase(firebaseConfig);

/**
 * Function that initalizes the connection to firebase using config
 * @param {Object} config Config used to connect
 * @throws Throws an exception if there is a problem connecting to firebase using config. Catches exception with a message saying 'There was a problem connecting to the server. Please check your internet connection or try again later.'
 */
function connectToFirebase(config: Object) {
  if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);
}

export default firebase;
