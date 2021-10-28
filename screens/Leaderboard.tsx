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

let pointValuesArr: any[] = [];
export default function LeaderboardScreen({ navigation }: RootTabScreenProps<"Leaderboard">) {

  //console.log(data1)

  const [points, setPoints] = useState<any>([]);

  useEffect(() => {
    firebase.database().ref('Accounts').on('value', function (snapshot) {
      snapshot.forEach((child) => {
        var pointValues = child.child("points").val();
        if(pointValues!= null){
          pointValuesArr.push(pointValues)
        }
        console.log(child.child("accountID").val())
      })
      
      setPoints(pointValuesArr)
    });
  }, []);

  return (
    <Leaderboard
      data= {points}
      labelBy='userName'
      sortBy='highScore'
       />   
  );
}


