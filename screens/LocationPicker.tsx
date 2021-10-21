import React, { useState } from "react";
import { StyleSheet, Button, View, NativeSyntheticEvent, NativeTouchEvent } from "react-native";
import MapView, { Marker, MapEvent, Polygon } from "react-native-maps";
import Gps from "../utils/gps";


const LocationPicker = (props: { onCancel: () => void; onConfirm: (coordinate: { latitude: number; longitude: number; }) => void; }) => {

  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [markerOpacity, setMarkerOpacity] = useState(0);
  let region = Gps();

  function onMapPress(e: MapEvent) {
    setMarkerCoordinate(e.nativeEvent.coordinate)
    setMarkerOpacity(1);
  }

  function onCancelPress(e: NativeSyntheticEvent<NativeTouchEvent>) {
    props.onCancel();
  }

  function onConfirmPress(e: NativeSyntheticEvent<NativeTouchEvent>) {
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
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  confirm: {
    ...StyleSheet.absoluteFillObject,
    // left: 50,
    // bottom: 50,
  }
});

export default LocationPicker;

