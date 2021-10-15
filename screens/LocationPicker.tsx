import React, { useState } from "react";
import { StyleSheet, Button, View, NativeSyntheticEvent, NativeTouchEvent, Dimensions } from "react-native";
import MapView, { Marker, MapEvent, LatLng } from "react-native-maps";


const LocationPicker = (props: { onConfirm: (coordinate: LatLng) => void; }) => {

  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [markerOpacity, setMarkerOpacity] = useState(0);

  function onMapPress(e: MapEvent) {
    setMarkerCoordinate(e.nativeEvent.coordinate)
    setMarkerOpacity(1);
  }

  function onConfirmPress(e: NativeSyntheticEvent<NativeTouchEvent>) {
    props.onConfirm(markerCoordinate);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={"google"}
        initialRegion={{
          latitude: 39.9812,
          longitude: -75.1497,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        showsUserLocation={true}
        onPress={onMapPress}
      >
        <Marker
          coordinate={markerCoordinate}
          opacity={markerOpacity}
        />
      </MapView>
      <Button
        // style={styles.confirm}
        title="Confirm"
        onPress={onConfirmPress}
      ></Button>
    </View>
  );
};


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
    // height: Dimensions.get("window").height,
    // width: Dimensions.get("window").width,
  },
  confirm: {
    ...StyleSheet.absoluteFillObject,
    // left: 50,
    // bottom: 50,
  }
});

export default LocationPicker;

