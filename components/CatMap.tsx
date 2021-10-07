import React, { useEffect } from "react";

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
          ></Marker>
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
