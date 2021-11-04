import React from "react";
import {
  SafeAreaView,
  View,
  ImageBackground,
  Text,
  Image,
  StyleSheet
} from "react-native";
import LoginAuthentication from "../components/LoginAuthentication";

/**
 * Function that renders the login screen.
 * @component
 * @returns {JSX.Element} JSX element of the login screen
 */
export default function LoginScreen () {
  /**
   * The uri of an image to be used in the background of the login screen.
   * @constant {{uri: string}}
   */
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <ImageBackground source={require("../assets/images/background.png")} resizeMode="cover" style={styles.backgroundImage}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("../assets/images/Temple-Cats-logo.jpg")}
            />
            <LoginAuthentication/>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center"
  },
  logo: {
    width:250, 
    height: 250,
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#8b0000",
    marginBottom: 50
  },
  logoContainer: {
    height: 400,
    width: 325,
    backgroundColor: 'white',
    borderRadius: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    alignItems: 'center',
    paddingTop: 20
  }
});
