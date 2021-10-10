import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";

function getRandomLatitude(min = 48, max = 56) {
  return Math.random() * (max - min) + min;
}

function getRandomLongitude(min = 14, max = 24) {
  return Math.random() * (max - min) + min;
}
interface Markers {
  id: number;
  latitude: number;
  longitude: number;
}

function App(): JSX.Element {
  const [zoom, setZoom] = useState(18);
  const [markers, setMarkers] = useState<Markers[]>([
    { id: 0, latitude: 53.91326738786109, longitude: 27.523712915343737 },
  ]);
  const region: Region = {
    latitude: 53.91326738786109,
    longitude: 27.523712915343737,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };
  const map = React.useRef(null);

  const generateMarkers = React.useCallback((lat: number, long: number) => {
    const markersArray = [];

    for (let i = 0; i < 50; i++) {
      markersArray.push({
        id: i,
        latitude: getRandomLatitude(lat - 0.05, lat + 0.05),
        longitude: getRandomLongitude(long - 0.05, long + 0.05),
      });
    }
    setMarkers(markersArray);
  }, []);

  useEffect(() => {
    generateMarkers(region.latitude, region.longitude);
  }, []);

  const getRegionForZoom = (lat: number, lon: number, zoom: number) => {
    const distanceDelta = Math.exp(Math.log(360) - zoom * Math.LN2);
    const { width, height } = Dimensions.get("window");
    const aspectRatio = width / height;
    return {
      latitude: lat,
      longitude: lon,
      latitudeDelta: distanceDelta * aspectRatio,
      longitudeDelta: distanceDelta,
    };
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={map}
        mapType="hybrid"
        style={styles.mapView}
        initialRegion={region}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapView: { flex: 1, width: "100%", height: "100%" },
});

export default App;

const dbRef = firebase.database().ref();
dbRef
  .child("users")
  .child(userId)
  .get()
  .then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error(error);
  });
