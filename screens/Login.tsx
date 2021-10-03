import React from 'react';
import { SafeAreaView, View, ImageBackground, Text, StyleSheet} from "react-native";
import LoginAuthentication from '../components/LoginAuthentication';

/**
 * Function that renders the login screen.
 * @component
 * @returns {JSX.Element} JSX element of the login screen
 */
 export default function LoginScreen() {
  /**
   * The uri of an image to be used in the background of the login screen.
   * @constant {{uri: string}}
   */
  const image={uri:
    'https://media.istockphoto.com/photos/small-kittens-picture-id516230467?k=6&m=516230467&s=612x612&w=0&h=Exd6B-5vXxg-4t_t_USCDGqKO6d-1KCmQkS_smprKnI='
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            <Text style={styles.text}>Temple Cats</Text>
                  <LoginAuthentication />
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
    image: {
        flex: 1,
        justifyContent: "center"
    },
    text: {
        color: "white",
        fontSize: 42,
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#8b0000",
        marginBottom: 50
    }
    });