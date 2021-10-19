import Constants from 'expo-constants';
import * as React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from "@expo/vector-icons";

export default function Facebook() {
    return (
      <WebView 
        style={styles.container}
        source={{ uri: 'https://www.facebook.com/groups/templecats' }}
      />
    );
  }

  const styles = StyleSheet.create({
   /* container: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
    },*/
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
      }
  });
  