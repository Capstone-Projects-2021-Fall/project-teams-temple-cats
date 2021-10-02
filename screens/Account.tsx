import * as React from "react";
import { StyleSheet, Button } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import firebase from "firebase";
import { AuthContext } from "../context/FirebaseAuthContext";

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
      <EditScreenInfo path="/screens/Accounts.tsx" />
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
