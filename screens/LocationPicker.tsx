import React, { useRef, useState } from "react";
import { StyleSheet, Button, View, NativeSyntheticEvent, NativeTouchEvent, TouchableOpacity, Image } from "react-native";
import MapView, { Marker, MapEvent } from "react-native-maps";
import TUMapBorder from "../components/TUMapBorder";
import Gps from "../utils/gps";

const LocationPicker = (props: {
  onCancel: () => void;
  onConfirm: (coordinate: { latitude: number; longitude: number }) => void;
}) => {
  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [markerOpacity, setMarkerOpacity] = useState(0);
  const mapViewRef: React.MutableRefObject<MapView> | React.MutableRefObject<null> = useRef(null);
  const region = Gps();

  function goToTemple() {
    mapViewRef.current?.animateToRegion({
      latitude: 39.9806438149835,
      longitude: -75.15574242934214,
      latitudeDelta: 0.022,
      longitudeDelta: 0.022 },
      1000);
  }

  function onMapPress(e: MapEvent) {
    setMarkerCoordinate(e.nativeEvent.coordinate);
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
      <MapView ref={mapViewRef}
        style={styles.map}
        provider="google"
        initialRegion={region}
        showsUserLocation onPress={onMapPress}
      >
        <Marker coordinate={markerCoordinate} opacity={markerOpacity} />
        <TUMapBorder/>
      </MapView>
      <TouchableOpacity style={styles.templeButton} onPress={goToTemple}>
        <Image style={styles.templeLogo} source={require("../assets/images/temple-logo.png")}/>
      </TouchableOpacity>
      <Button
        title="Cancel"
        onPress={onCancelPress}
      />
      <Button
        title="Confirm"
        onPress={onConfirmPress}
      />
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
  },
});

export default LocationPicker;
