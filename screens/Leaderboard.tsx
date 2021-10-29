import React, { useEffect, useState } from "react";
import { StyleSheet, Button } from "react-native";
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
let pointValuesWeekArr: any[] = [];
let final: any[] = [];

export default function LeaderboardScreen({ navigation }: RootTabScreenProps<"Leaderboard">) {

  //console.log(data1)

  const [points, setPoints] = useState<any>([]);
  const [pointsWeek, setPointsWeek] = useState<any>([]);
  const [value, setValue] = useState<any>([]);
  const [title, setTitle] = useState<any>("Click for Weekly Board");
  const [button, setbutton] = useState<any>(false);
  

  var curr = new Date; 
  var first = curr.getDate() - curr.getDay(); 
  var last = first + 6; 
  var firstday = new Date(curr.setDate(first));
  var lastday = new Date(curr.setDate(last));

  useEffect(() => {
    firebase.database().ref('Accounts').on('value', function (snapshot) {
      snapshot.forEach((child) => {
        var pointValues = child.child("points").val();
        var pointTimes = child.child("points").child("time").val();

        if (pointValues != null) {
          pointValuesArr.push(pointValues)
        }

        var currentDate = new Date(pointTimes);
        if (pointTimes != null &&  (currentDate > firstday) && (currentDate < lastday)) {
          pointValuesWeekArr.push(pointValues)
          console.log(pointValuesWeekArr)
        }
      })
      setPoints(pointValuesArr)
      setPointsWeek(pointValuesWeekArr)
      setValue(pointValuesArr)

      pointValuesArr = [];
      pointValuesWeekArr = [];
    });
  }, []);

  return (
    <View style={styles.container}>

      <Button
        color="#8b0000"
        title= {title}
        onPress={() => {
          {button === false ? setTitle("Click for All Time") : null}
          {button === false ? setbutton(true) : null}
          {button === false ? setValue(pointsWeek) : null}
          {button === true ? setTitle("Click for Weekly Board") : null}
          {button === true ? setbutton(false) : null}
          {button === true ? setValue(points) : null}

        }}
      />
      <Leaderboard
        data={value}
        labelBy='userName'
        sortBy='highScore'
      />
    </View>
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
  },
  buttonStyle: {
    textAlign: "left",
    fontFamily: "Cochin"
  }
});




