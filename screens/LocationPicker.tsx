import React, { useState } from "react";
import { StyleSheet, Button, View, NativeSyntheticEvent, NativeTouchEvent } from "react-native";
import MapView, { Marker, MapEvent } from "react-native-maps";
import Gps from "../utils/gps";

const LocationPicker = (props: { onCancel: () => void; onConfirm: (coordinate: { latitude: number; longitude: number; }) => void; }) => {
  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: 0,
    longitude: 0
  });
  const [markerOpacity, setMarkerOpacity] = useState(0);
  const region = Gps();

  function onMapPress (e: MapEvent) {
    setMarkerCoordinate(e.nativeEvent.coordinate);
    setMarkerOpacity(1);
  }

  function onCancelPress (e: NativeSyntheticEvent<NativeTouchEvent>) {
    props.onCancel();
  }

  function onConfirmPress (e: NativeSyntheticEvent<NativeTouchEvent>) {
    props.onConfirm(markerCoordinate);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={"google"}
        initialRegion={region}
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
        title="Cancel"
        onPress={onCancelPress}
      ></Button>
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
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  confirm: {
    ...StyleSheet.absoluteFillObject
    // left: 50,
    // bottom: 50,
  }
});

export default LocationPicker;
