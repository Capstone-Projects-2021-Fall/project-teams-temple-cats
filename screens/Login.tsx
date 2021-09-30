import {Button, SafeAreaView, View, ImageBackground, Text, StyleSheet, Alert } from "react-native";
import * as WebBrowser from 'expo-web-browser';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { ResponseType } from 'expo-auth-session';
import firebase from 'firebase';
import React, { useState } from 'react';
import { useHistory }  from 'react-router-dom';
import { useNavigation } from '@react-navigation/native';
import { StackRouter } from "@react-navigation/routers";
import HomeScreen from "./Home";



const image={uri:
  'https://media.istockphoto.com/photos/small-kittens-picture-id516230467?k=6&m=516230467&s=612x612&w=0&h=Exd6B-5vXxg-4t_t_USCDGqKO6d-1KCmQkS_smprKnI='
 };

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
    measurementId: "G-PTQHR7RT4M"
  });
}

//Dismisses web pop up

WebBrowser.maybeCompleteAuthSession();

const Login = () => {

  const [request, response, promptAsync] = Facebook.useAuthRequest({
    responseType: ResponseType.Token,
    clientId: '562935831789483',
  });

  React.useEffect(() => {

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        alert("already logged in"); 
        navigate(HomeScreen);       
      } else {

        if (response?.type === 'success') {
          const { access_token } = response.params;
          const credential = firebase.auth.FacebookAuthProvider.credential(access_token);
          // Sign in with the credential from the Facebook user.
          firebase.auth().signInWithCredential(credential);
        }

      }
    });
  }, [response]);



  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <Text style={styles.text}>Temple Cats</Text>
        </ImageBackground>
      </View>
      
      <View>
        <Button
          title="Sign in"
          color="#8b0000"
          onPress={() => {
            promptAsync();
          }}
        />
      </View>
    
      <View>
        <Separator />
      </View>

    </SafeAreaView>
  );

}

const Separator = () => (
  <View style={styles.separator} />
);

const styles = StyleSheet.create({
    container: {
       flex: 1,
     },
     image: {
       flex: 1,
       justifyContent: "center"
     },

     title: {
      textAlign: 'center',
      marginVertical: 8,
      backgroundColor: "#2f4f4f"
      
    },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
     text: {
       color: "white",
       fontSize: 42,
       lineHeight: 84,
       fontWeight: "bold",
       textAlign: "center",
       backgroundColor: "#8b0000"
     },

     separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
   });
   
export default Login;