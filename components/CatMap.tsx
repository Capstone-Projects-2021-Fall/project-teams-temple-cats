import React, { useEffect, useState } from "react";
import { StyleSheet, Button } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { View } from "./Themed";
import firebase from "../utils/firebase";

interface Markers {
  id: number;
  latitude: number;
  longitude: number;
}

//Stores cat pins into array

var catObject = {};

firebase
  .database()
  .ref("Pins")
  .on("value", (snap) => {
    catObject = snap.exportVal();
  });

const cat_names = Object.keys(catObject);

function getLatitude(x: String) {
  var catLatitude = 0; //initializes cat lattidue

  //Builds queryString

  let queryString = "Pins/";
  queryString += x;
  queryString += "/Location/lat";

  console.log(queryString);

  firebase
    .database()
    .ref(queryString)
    .on("value", (snap) => {
      catLatitude = snap.exportVal();
    });

  console.log(catLatitude);
  return catLatitude;
}

function getLongitude(x: string) {
  var catLongitude = 0;

  let queryString = "Pins/";
  queryString += x;
  queryString += "/Location/lng";

  console.log(queryString);

  firebase
    .database()
    .ref(queryString)
    .on("value", (snap) => {
      catLongitude = snap.exportVal();
    });

  console.log(catLongitude);
  return catLongitude;
}

export default function CatMap() {
  const [markers, setMarkers] = useState<Markers[]>([
    { id: 0, latitude: 53.91326738786109, longitude: 27.523712915343737 },
  ]);

  const region: Region = {
    latitude: 39.9812,
    longitude: -75.1497,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };

  //Avoids uneccasary rerenders of code

  const generateMarkers = React.useCallback((lat: number, long: number) => {
    const markersArray = [];

    //Passes cat pins to retrieve longitude and lattiude and pushes to MarkersArray

    for (let i = 0; i < cat_names.length; i++) {
      markersArray.push({
        id: i,
        latitude: getLatitude(cat_names[i]),
        longitude: getLongitude(cat_names[i]),
      });
    }

    setMarkers(markersArray);
  }, []);

  useEffect(() => {
    generateMarkers(region.latitude, region.longitude);
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
      >
        {markers.map((item) => (
          <Marker
            key={item.id}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
          ></Marker>
        ))}
      </MapView>

      <View style={styles.buttonContainer}>
        <Button
          color="#8b0000"
          title="Add a Pin"
          onPress={() => {
            alert("test");
          }}
        />
      </View>
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
  buttonContainer: {
    position: "absolute",
    top: 50,
    left: 20,
  },
});
