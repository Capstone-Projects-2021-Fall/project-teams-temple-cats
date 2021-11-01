import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { View } from './Themed';
import firebase from '../utils/firebase';
import Gps from '../utils/gps';
import { Cat } from '../types';
import TUMapBorder from './TUMapBorder';

/**
 * Function that renders the Cat Map component, including the map and all it's children (e.g. pins/markers).
 * @component
 * @returns {JSX.Element} JSX element of the map
 */
export default function CatMap() {
  const [cats, setCats] = useState<any>([]);
  const mapViewRef: React.MutableRefObject<MapView> | React.MutableRefObject<null> = useRef(null);
  const catsRef = firebase.database().ref().child('Cats/');
  const region = Gps();
  const newState: Cat[] = [];

  useEffect(() => {
    catsRef.on('child_added', (snapshot) => {
      newState.push(snapshot.val());
      setCats([...newState]);
    });
  }, []);

  function goToTemple() {
    mapViewRef.current?.animateToRegion({
      latitude: 39.9806438149835,
      longitude: -75.15574242934214,
      latitudeDelta: 0.022,
      longitudeDelta: 0.022,
    },
    1000);
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapViewRef}
        style={styles.map}
        provider="google"
        region={region}
        showsUserLocation
      >
        {cats?.map((cat, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: cat.location.latitude,
              longitude: cat.location.longitude,
            }}
          />
        ))}
        <TUMapBorder />
      </MapView>
      <TouchableOpacity style={styles.templeButton} onPress={goToTemple}>
        <Image style={styles.templeLogo} source={require('../assets/images/temple-logo.png')} />
      </TouchableOpacity>
    </View>
  );
}

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
