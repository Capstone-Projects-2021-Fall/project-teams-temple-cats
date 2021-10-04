import React, {useEffect, useState} from 'react';

import { StyleSheet, Button,  } from 'react-native';
import MapView, { Marker, Region} from 'react-native-maps';
import { View } from './Themed';
import firebase from '../utils/firebase';

interface Markers {
  id: number
  latitude: number
  longitude: number
}

firebase.database().ref('test').on('value',(snap)=>{

  return snap.val();

});

function getLatitude() {

  return 0

 }


function getLongitude() {
  return 0
}


export default function CatMap() {

  const [markers, setMarkers] = useState<Markers[]>([
    { id: 0, latitude: 53.91326738786109, longitude: 27.523712915343737 },
  ])

  const region: Region = {
    latitude: 39.9812,
    longitude: -75.1497,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  }

  const generateMarkers = React.useCallback((lat: number, long: number) => {
    const markersArray = []

    for (let i = 0; i < 1; i++) {
      markersArray.push({
        id: i,
        latitude: getLatitude(),
        longitude: getLongitude(),
      })
    }
    setMarkers(markersArray)
  }, [])

  useEffect(() => {
    generateMarkers(region.latitude, region.longitude)
  }, [])


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

        >
      {markers.map((item) => (
        <Marker
          key={item.id}
          coordinate={{
            latitude: item.latitude,
            longitude: item.longitude,
          }}></Marker>
      ))}
    </MapView>

      <View style={styles.buttonContainer}>
        <Button
          color="#8b0000"
          title="Add a Pin"
          onPress={() => {
            alert("test");
          }}
        />
      </View>
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
  buttonContainer: {
    position: 'absolute',
    top: 50,
    left: 20
  }
});
