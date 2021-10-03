import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Facebook from "expo-auth-session/providers/facebook";
import { ResponseType } from "expo-auth-session";
import firebase from "../utils/firebase";
import { Button } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export default function LoginAuthentication() {
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    responseType: ResponseType.Token,
    clientId: "562935831789483",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      const credential =
        firebase.auth.FacebookAuthProvider.credential(access_token);
      firebase.auth().signInWithCredential(credential);
    }
  }, [response]);

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
