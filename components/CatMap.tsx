import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import MapView, { Marker, Callout, Region } from "react-native-maps";
import { View } from "./Themed";
import firebase from "../utils/firebase";
import Gps from "../utils/gps";

/**
 * Function that renders the Cat Map component, including the map and all it's children (e.g. pins/markers).
 * @component
 * @returns {JSX.Element} JSX element of the map
 */

export default function CatMap () {
  const [markers, setMarkers] = useState<any>([]);
  const markersArray = [];
  const newState: { id: string; lat: any; lng: any; description: any }[] = [];
  const result: any[] = [];
  let result_counter = 0;
  const region = Gps();

  useEffect(() => {
    const reference = firebase.database().ref("Pins/");
    let pin;
    reference.on("value", (snapshot) => {
      const items = snapshot.val();

      firebase
        .database()
        .ref("Pins/")
        .on("value", (snap) => {
          // Stores cat objects results into array

          const catObject = snap.val();
          for (const i in catObject) {
            result.push(i, catObject[i]);
          }

          // If results length is odd, make it even

          let resultLength = result.length;
          if (resultLength % 2 == 0) {
            resultLength += 1;
          }

          // Remove Account ID from array

          for (let l = 0; l <= resultLength; l++) {
            result.splice(l, 1);
          }

          // Store each array element as an item property

          for (const item in items) {
            const descrip = JSON.stringify(result[result_counter]);
            const description = descrip.split(",").join("\n");
            items[item].description = description;
            newState.push({
              id: item,
              lat: items[item].location.latitude,
              lng: items[item].location.longitude,
              description: items[item].description
            });

            result_counter++;
          }
          setMarkers(newState);
        });
    });
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={"google"}
        region={region}
        showsUserLocation={true}
      >
        {markers?.map(
          (
            item: {
              id: string | undefined;
              lat: any;
              lng: any;
              description:
                | boolean
                | React.ReactChild
                | React.ReactFragment
                | React.ReactPortal
                | null
                | undefined;
            },
            index: React.Key | null | undefined
          ) => (
            <Marker
              key={index}
              title={item.id}
              coordinate={{
                latitude: item.lat,
                longitude: item.lng
              }}
            >
              <Callout>
                <Text>{item.description}</Text>
              </Callout>
            </Marker>
          )
        )}
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
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
