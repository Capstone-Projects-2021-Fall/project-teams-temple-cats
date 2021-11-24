import React, { useEffect, useState } from 'react';
import { StyleSheet, Button, Switch } from 'react-native';
import firebase from 'firebase';
import Leaderboard from 'react-native-leaderboard';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { white } from 'react-native-paper/lib/typescript/styles/colors';

/**
 * Function that renders the leaderboard screen.
 * @component
 * @param {RootTabScreenProps} props navigation properties from the root of the leaderboard button in navigation
 * @returns {JSX.Element} JSX element of the leaderboard screen
 */

let pointValuesArr: any[] = [];
let pointValuesWeekArr: any[] = [];
const final: any[] = [];

export default function LeaderboardScreen({ navigation }: RootTabScreenProps<'Leaderboard'>) {

  const [points, setPoints] = useState<any>([]);
  const [pointsWeek, setPointsWeek] = useState<any>([]);
  const [value, setValue] = useState<any>([]);
  const [title, setTitle] = useState<any>('Click for Weekly Board');
  const [button, setbutton] = useState<any>(false);

  var curr = new Date(); 
  var first = curr.getDate() - curr.getDay(); 
  var firstday = new Date(curr.setDate(first));    
  var lastday = new Date(curr.setDate(curr.getDate()+6));

  useEffect(() => {
    firebase.database().ref('Accounts').on('value', (snapshot) => {
      snapshot.forEach((child) => {
        const pointValues = child.child('points').val();
        const pointTimes = child.child('points').child('time').val();

        if (pointValues != null) {
          pointValuesArr.push(pointValues);
        }

        const currentDate = new Date(pointTimes);
        if (pointTimes != null && (currentDate > firstday) && (currentDate < lastday)) {
          pointValuesWeekArr.push(pointValues);
          console.log(pointValuesWeekArr);
        }
      });
      setPoints(pointValuesArr);
      setPointsWeek(pointValuesWeekArr);
      setValue(pointValuesArr);

      pointValuesArr = [];
      pointValuesWeekArr = [];
    });
  }, []);

  function userScoreData(index, item) {
    navigation.push("UserRank")
  }
  const [isEnabled, setIsEnabled] = useState(false);

  function toggleSwitch() {
    setIsEnabled(previousState => !previousState);
    if(isEnabled){
      setValue(points);
    } 
    else{
      setValue(pointsWeek)
    }
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row',}}> 
      <Text style={styles.title}>All Time  </Text>
      <Switch
        trackColor={{ false: "#696969", true: "#8b0000" }}
        thumbColor={isEnabled ? "white" : "white"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => {
          toggleSwitch();
        }}
        value={isEnabled}
      />
       <Text style={styles.title}>  Weekly</Text>
      </View>
    
      <Leaderboard
        data={value}
        labelStyle={styles.listItem}
        labelBy="userName"
        sortBy="highScore"
        oddRowColor="#b22222"
        evenRowColor="white"
        onRowPress={(index, item) => {
          userScoreData(index, item);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#8b0000"
  },
  listItem: {
    color: "black",
    fontSize: 16,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  buttonStyle: {
    textAlign: 'left',
    fontFamily: 'Cochin',
  },
});
