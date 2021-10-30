import * as React from "react";
import { Button, Linking, StyleSheet, Pressable } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

/**
 * Function that renders the resources screen.
 * @component
 * @param {RootTabScreenProps} props navigation properties from the root of the resources button in navigation
 * @returns {JSX.Element} JSX element of the resources screen
 */
export default function ResourcesScreen ({ navigation }: RootTabScreenProps<"Resources">) {
  const urlPaws="https://phillypaws.org/clinic-services/"
  const urlForgottenCats="https://forgottencats.org/program-services-fees/"
  return (
    <View style={styles.container}>
      <Pressable style={styles.button}
        onPress={() => Linking.openURL(urlPaws)}>
        <Text style={styles.text}>PAWS</Text>
      </Pressable>

      <Pressable style={styles.button}
        onPress={() => Linking.openURL(urlForgottenCats)}>
        <Text style={styles.text}>FORGOTTEN CATS</Text>
      </Pressable>
    </View>
  )}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 20,
    paddingHorizontal: 90,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#8B0000',
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 'bold',
    letterSpacing: .25,
    color: 'white',
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  }
});
