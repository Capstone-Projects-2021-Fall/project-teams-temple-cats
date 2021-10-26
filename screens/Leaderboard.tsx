import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import firebase from "firebase";
import Leaderboard from 'react-native-leaderboard';

/**
 * Function that renders the leaderboard screen.
 * @component
 * @param {RootTabScreenProps} props navigation properties from the root of the leaderboard button in navigation
 * @returns {JSX.Element} JSX element of the leaderboard screen
 */

let data1: any[] = [];
export default function LeaderboardScreen({ navigation }: RootTabScreenProps<"Leaderboard">) {

  //console.log(data1)

  const [word, setWord] = useState<any>([]);

  useEffect(() => {
    firebase.database().ref('Accounts').on('value', function (snapshot) {
      snapshot.forEach((child) => {
        var test = child.child("points").val();
        if(test!= null){
          data1.push(test)
        }
        console.log(child.child("accountID").val())
          //console.log(test)
      })
      
      setWord(data1)
    });

  }, []);


  //delete word[2]

  console.log(word)


  //console.log(word)

  return (

    <Leaderboard
      data= {word}
      labelBy='userName'
      sortBy='highScore'
       />   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
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
