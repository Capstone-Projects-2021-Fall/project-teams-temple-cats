import Constants from "expo-constants";
import * as React from "react";
import { StyleSheet, Text, View, StatusBar, Linking, Button, Alert} from "react-native";
import { WebView } from "react-native-webview";
import LoginAuthentication from "../components/LoginAuthentication";


export default function Facebook () {

  return (
    Alert.alert(
      "Alert",
      "Do you want to open Facebook in the App?",
      [ 
        { text: "No", 
          onPress: () => console.log("Button pressed"),
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => Linking.openURL("fb://profile/250544657405"),
          
        }
        
      ],
      { cancelable: false }
    ),
    <WebView
        styles={styles.container}
        source={{ uri: "https://www.facebook.com/groups/templecats" }} 
        />
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  }
});
