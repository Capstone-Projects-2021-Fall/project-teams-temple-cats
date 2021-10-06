import React from 'react';

import { Alert, Button, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { View } from './Themed';
import CatForm from '../screens/CatForm'
import navigation from '../navigation';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";



/**
 * Function that renders the Cat Map component, including the map and all it's children (e.g. pins/markers).
 * @component
 * @returns {JSX.Element} JSX element of the map
 */
export default function CatMap() {
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

        <Marker
          key='testkey'
          coordinate={{
            latitude: 39.9812,
            longitude: -75.1497
          }}
          title='testtitle'
          description='testdescription'
        />
      </MapView>
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
});

/*

<Pressable
              onPress={() => navigation.navigate(<CatInformation/>)}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
       />

<Button
        title="Submit"
        color="#8b0000"
        onPress={() => 
          {
            
          }
        }
      />


*/