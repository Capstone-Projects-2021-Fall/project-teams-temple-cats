import React, { useState } from "react";
import { StyleSheet, Button, View, NativeSyntheticEvent, NativeTouchEvent, Dimensions } from "react-native";
import MapView, { Marker, MapEvent } from "react-native-maps";


const LocationPicker = (props: { onConfirm: (latitude: number, longitude: number) => void; }) => {

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [marked, setMarked] = useState(0);

  function onMapPress(e: MapEvent) {
    setLatitude(e.nativeEvent.coordinate.latitude);
    setLongitude(e.nativeEvent.coordinate.longitude);    
    setMarked(1);
  }

  function onConfirmPress(e: NativeSyntheticEvent<NativeTouchEvent>) {
    props.onConfirm(latitude, longitude);
  }

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
        onPress={onMapPress}
      >
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          opacity={marked}
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

