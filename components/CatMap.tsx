import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import MapView, { Marker, Callout, Region } from "react-native-maps";
import { View } from "./Themed";
import firebase from "../utils/firebase";
import Gps from "../utils/gps";
import { Cat } from "../types";

/**
 * Function that renders the Cat Map component, including the map and all it's children (e.g. pins/markers).
 * @component
 * @returns {JSX.Element} JSX element of the map
 */

export default function CatMap() {
  const [cats, setCats] = useState<Array<Cat>>([]);
  const catsRef = firebase.database().ref().child("Cats/")
  let region = Gps();

  let newState: Cat[] = []
    catsRef
    .on("child_added", (snapshot) => {
      newState.push(snapshot.val())
    })
  
  useEffect(() => {
    console.log("effect used")
    setCats(newState)
  }, [])
    
  
  console.log(cats)


  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={"google"}
        region={region}
        showsUserLocation={true}
      >
        
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
