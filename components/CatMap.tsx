import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { View } from './Themed';
import firebase from '../utils/firebase';
import Gps from '../utils/gps';
import { Cat } from '../types';
import TUMapBorder from './TUMapBorder';
import Colors from '../constants/Colors';

/**
 * Function that renders the Cat Map component, including the map and all it's children (e.g. pins/markers).
 * @component
 * @returns {JSX.Element} JSX element of the map
 */
export default function CatMap() {
  const [cats, setCats] = useState<Cat[]>([]);
  const mapViewRef: React.MutableRefObject<MapView> | React.MutableRefObject<null> = useRef(null);
  const catsRef = firebase.database().ref().child('Cats/');

  const myLocation = Gps();
  const newState: Cat[] = [];

  useEffect(() => {
    catsRef.on('child_added', async (snapshot) => {
      const picUri = await firebase.storage().ref().child(`${snapshot.val().accountID}/${snapshot.val().catID}/`).getDownloadURL();
      newState.push({ ...snapshot.val(), media: picUri });

      setCats([...newState]);
    });
  }, []);

  function goToMyLocation() {
    mapViewRef.current?.animateToRegion(
      myLocation,
      1000,
    );
  }

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
        region={myLocation}
        showsUserLocation
      >
        {cats?.map((cat, index) => (

          <Marker
            key={index}
            coordinate={{
              latitude: cat.location.latitude,
              longitude: cat.location.longitude,
            }}
          >
            <Image
              style={{
                width: 50, height: 50, borderWidth: 5, borderColor: '#a52a2a',
              }}
              source={{
                uri: cat.media,
              }}
            />

          </Marker>

        ))}
        <TUMapBorder />
      </MapView>
      <TouchableOpacity style={styles.myLocationButton} onPress={goToMyLocation}>
        <MaterialIcons
          name="my-location"
          size={25}
          color={Colors.light.text}
          style={styles.myLocationIcon}
        />
      </TouchableOpacity>
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
  myLocationButton: {
    position: 'absolute',
    right: 12,
    top: 10,
    width: 38,
    height: 38,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.20,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
  },
  templeLogo: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  catPin: {
    width: 30,
    height: 30,
  },
});
