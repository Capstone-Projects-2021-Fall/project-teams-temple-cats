import { MaterialIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Button,
  View,
  NativeSyntheticEvent,
  NativeTouchEvent,
  TouchableOpacity,
  Image,
} from 'react-native';
import MapView, { Marker, MapEvent } from 'react-native-maps';
import TUMapBorder from '../components/TUMapBorder';
import Colors from '../constants/Colors';
import Gps from '../utils/gps';
/**
 * Function that renders the view for picking a location a cat was seen.
 * @component
 * @param {RootTabScreenProps} props navigation properties from the root of the account button in navigation
 * @returns {JSX.Element} JSX element of the account screen
 */
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
  const myLocation = Gps();

  function goToMyLocation() {
    mapViewRef.current?.animateToRegion(myLocation, 1000);
  }

  function goToTemple() {
    mapViewRef.current?.animateToRegion(
      {
        latitude: 39.9806438149835,
        longitude: -75.15574242934214,
        latitudeDelta: 0.022,
        longitudeDelta: 0.022,
      },
      1000,
    );
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
      <MapView
        ref={mapViewRef}
        style={styles.map}
        provider="google"
        initialRegion={myLocation}
        showsUserLocation
        showsMyLocationButton={false}
        onPress={onMapPress}
      >
        <Marker coordinate={markerCoordinate} opacity={markerOpacity} />
        <TUMapBorder />
      </MapView>
      <TouchableOpacity style={styles.myLocationButton} onPress={goToMyLocation}>
        <MaterialIcons name="my-location" size={25} color={Colors.light.text} style={styles.myLocationIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.templeButton} onPress={goToTemple}>
        <Image style={styles.templeLogo} source={require('../assets/images/temple-logo.png')} />
      </TouchableOpacity>
      <Button title="Cancel" onPress={onCancelPress} />
      <Button title="Confirm" onPress={onConfirmPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  myLocationButton: {
    position: 'absolute',
    right: 12,
    top: 10,
    width: 38,
    height: 38,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  myLocationIcon: {
    opacity: 0.7,
  },
  templeButton: {
    position: 'absolute',
    right: 12,
    top: 60,
    width: 38,
    height: 38,
  },
  templeLogo: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
});

export default LocationPicker;
