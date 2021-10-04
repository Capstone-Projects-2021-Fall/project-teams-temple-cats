import * as React from "react";
import { StyleSheet, Button } from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import firebase from "firebase";
import { AuthContext } from "../context/FirebaseAuthContext";

/**
 * Function that renders the account screen.
 * @component
 * @param {RootTabScreenProps} props navigation properties from the root of the account button in navigation
 * @returns {JSX.Element} JSX element of the account screen
 */
export default function AccountScreen({
  navigation,
}: RootTabScreenProps<"Account">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button
        color="#8b0000"
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
}

const signOut = async () => {
  firebase.auth().signOut();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
