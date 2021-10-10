import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";

import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { View } from "./Themed";
import firebase from "../utils/firebase";

/**
 * Function that renders the Cat Map component, including the map and all it's children (e.g. pins/markers).
 * @component
 * @returns {JSX.Element} JSX element of the map
 */
export default function CatMap() {
  const [markers, setMarkers] = React.useState<any>([]);
  let markersArray = [];
  let newState = [];
  let result = [];
  var result_counter = 0

  React.useEffect(() => {

    var reference = firebase.database().ref("Pins/");
    let pin;
    reference.on("value", (snapshot) => {

      let items = snapshot.val();
      console.log(items)

      firebase.database().ref("Cats/").on("value", (snap) => {

        //Stores cat objects results into array

          let catObject = snap.val();
          for (var i in catObject) {
            result.push(i, catObject[i])
          }

          //If results length is odd, make it even

          var resultLength = result.length
          if(resultLength % 2 == 0){
            resultLength += 1;
          }

          //Remove Account ID from array

          for( var l = 0; l <= resultLength; l++){
            result.splice(l,1)
          }

          //Store each array element as an item property

          for (let item in items) {
           var descrip = JSON.stringify(result[result_counter])
           var description = descrip.split(",").join("\n")
           items[item].description = description
            newState.push({
              id: item,
              lat: items[item].Location.lat,
              lng: items[item].Location.lng,
              description: items[item].description,
            });

            result_counter++;
          }
          setMarkers(newState);
      })

    });


  React.useEffect(() => {
    var reference = firebase.database().ref("Pins/");
    let pin;
    reference.on("value", (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          lat: items[item].Location.lat,
          lng: items[item].Location.lng,
        });
      }
      setMarkers(newState);
    });
  }, []);

  return (

    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: 39.9812,
          longitude: -75.1497,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        provider={"google"}
      >
        {markers?.map((item, index) => (
          <Marker
            key={index}
            title={item.id}
            coordinate={{
              latitude: item.lat,
              longitude: item.lng,
            }}
          >
            <Callout>
              <Text>{item.description}</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
