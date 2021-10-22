import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import MapView, { Marker, Callout, Region } from "react-native-maps";
import { View } from "./Themed";
import firebase from "../utils/firebase";
import Gps from "../utils/gps";
import TUMapBorder from "./TUMapBorder";

/**
 * Function that renders the Cat Map component, including the map and all it's children (e.g. pins/markers).
 * @component
 * @returns {JSX.Element} JSX element of the map
 */

export default function CatMap () {
  const [markers, setMarkers] = useState<any>([]);
  const [region, setRegion] = useState<Region>(Gps());
  const mapViewRef: React.MutableRefObject<MapView> | React.MutableRefObject<null> = useRef(null);
  let markersArray = [];
  let newMarkers: { id: string; lat: any; lng: any; description: any }[] = [];
  let result: any[] = [];
  var result_counter = 0;

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
            newMarkers.push({
              id: item,
              lat: items[item].location.latitude,
              lng: items[item].location.longitude,
              description: items[item].description
            });

            result_counter++;
          }
          setMarkers(newMarkers);
        });
    });
  }, []);

  function goToTemple() {
    mapViewRef.current?.animateToRegion({
      latitude: 39.9806438149835,
      longitude: -75.15574242934214,
      latitudeDelta: 0.022,
      longitudeDelta: 0.022 },
      1000);
  }

  return (
    <View style={styles.container}>
      <MapView ref={mapViewRef}
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
        <TUMapBorder/>
      </MapView>
      <TouchableOpacity style={styles.templeButton} onPress={goToTemple}>
        <Image style={styles.templeLogo} source={require("../assets/images/temple-logo.png")}/>
      </TouchableOpacity>
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
    ...StyleSheet.absoluteFillObject,
  },
  templeButton: {
    position: "absolute",
    right: 12,
    top: 60,
    width: 38,
    height: 38,
  },
  templeLogo: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  }
});
