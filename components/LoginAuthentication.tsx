import * as WebBrowser from "expo-web-browser";
import * as Facebook from "expo-auth-session/providers/facebook";
import { ResponseType } from "expo-auth-session";
import { FirebaseContext } from "../utils/firebase";
import "firebase/app";
import { Button, StyleSheet } from "react-native";
import React from "react";

//Dismisses web pop up

WebBrowser.maybeCompleteAuthSession();

//Request response token from user

export default function LoginAuthentication() {
  const firebase = React.useContext(FirebaseContext);
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    responseType: ResponseType.Token,
    clientId: "562935831789483",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      console.log("Signing into firebase");
      const { access_token } = response.params;
      console.log("Facebook access Token: ");
      console.log(response.params);
      const credential =
        firebase.auth.FacebookAuthProvider.credential(access_token);
      // Sign in with the credential from the Facebook user.
      firebase.auth().signInWithCredential(credential);
      console.log("Firebase Token: ");
      console.log(credential);
      console.log(firebase.auth().currentUser);
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      color="#8b0000"
      title="Login"
      onPress={() => {
        if (!firebase.auth().currentUser) promptAsync();
        else alert("You're already signed in");
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
