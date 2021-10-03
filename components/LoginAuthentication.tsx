import * as WebBrowser from "expo-web-browser";
import * as Facebook from "expo-auth-session/providers/facebook";
import { ResponseType } from "expo-auth-session";
import firebase from "firebase";
import { Button, StyleSheet } from "react-native";
import React from "react";

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDhKqRV1ALg80TdK0GsSFEq0BR6BK8UiPs",
    authDomain: "temple-cats.firebaseapp.com",
    databaseURL: "https://temple-cats-default-rtdb.firebaseio.com",
    projectId: "temple-cats",
    storageBucket: "temple-cats.appspot.com",
    messagingSenderId: "645364453008",
    appId: "1:645364453008:web:e2b6afd21de03516ccd215",
    measurementId: "G-PTQHR7RT4M",
  });
}

//Dismisses web pop up

WebBrowser.maybeCompleteAuthSession();

//Request response token from user

/**
 * Function that renders the Login Authentication component with a button to log in.
 * @component LoginAuthentication
 * @returns {JSX.Element} JSX element of the login
 */
export default function LoginAuthentication() {
  /**
   * const
   */
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    responseType: ResponseType.Token,
    clientId: "562935831789483",
  });

  React.useEffect(
    /**
     * function
     */    
    () => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          alert("already logged in");
        } else {
          if (response?.type === "success") {
            const { access_token } = response.params;
            const credential =
              firebase.auth.FacebookAuthProvider.credential(access_token);
            // Sign in with the credential from the Facebook user.
            firebase.auth().signInWithCredential(credential);
          }
        }
      });
    }, [response]
  );

  return (
    <Button
      disabled={!request}
      color="#8b0000"
      title="Login"
      onPress={() => {
        promptAsync();
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
});


