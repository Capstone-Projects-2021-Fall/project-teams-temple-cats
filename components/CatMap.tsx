import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import MapView, { Marker, Callout, Region, Polygon } from "react-native-maps";
import { View } from "./Themed";
import firebase from "../utils/firebase";
import Gps from "../utils/gps";

/**
 * Function that renders the Cat Map component, including the map and all it's children (e.g. pins/markers).
 * @component
 * @returns {JSX.Element} JSX element of the map
 */

export default function CatMap() {
  const [markers, setMarkers] = useState<any>([]);
  let markersArray = [];
  let newState: { id: string; lat: any; lng: any; description: any }[] = [];
  let result: any[] = [];
  var result_counter = 0;
  let region = Gps();

  useEffect(() => {
    var reference = firebase.database().ref("Pins/");
    let pin;
    reference.on("value", (snapshot) => {
      let items = snapshot.val();

      firebase
        .database()
        .ref("Pins/")
        .on("value", (snap) => {
          //Stores cat objects results into array

          let catObject = snap.val();
          for (var i in catObject) {
            result.push(i, catObject[i]);
          }

          //If results length is odd, make it even

          var resultLength = result.length;
          if (resultLength % 2 == 0) {
            resultLength += 1;
          }

          //Remove Account ID from array

          for (var l = 0; l <= resultLength; l++) {
            result.splice(l, 1);
          }

          //Store each array element as an item property

          for (let item in items) {
            var descrip = JSON.stringify(result[result_counter]);
            var description = descrip.split(",").join("\n");
            items[item].description = description;
            newState.push({
              id: item,
              lat: items[item].location.latitude,
              lng: items[item].location.longitude,
              description: items[item].description,
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
                latitude: (item.lat === undefined) ? 0 : item.lat,
                longitude: (item.lng === undefined) ? 0 : item.lng,
              }}
            >
              <Callout>
                <Text>{item.description}</Text>
              </Callout>
            </Marker>
          )
        )}
        <Polygon
          coordinates={[
            { latitude: 39.975237221562914, longitude: -75.16531142948794 },
            { latitude: 39.99028527887604, longitude: -75.16201582672468 },
            { latitude: 39.98821021677819, longitude: -75.14598521349043 },  
            { latitude: 39.9731936067945, longitude: -75.14928693177747 }          
          ]}
          strokeWidth={2}
          strokeColor="rgba(157, 34, 53, 1)"
          fillColor="rgba(157, 34, 53, 0.05)"
        />
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
