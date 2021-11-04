import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, TouchableOpacity, Image} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { View } from "./Themed";
import firebase from "../utils/firebase";
import Gps from "../utils/gps";
import { Cat } from "../types";
import TUMapBorder from "./TUMapBorder";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { Stations } from "../components/Stations"
import { RootTabScreenProps } from "../types";

/**
 * Function that renders the Cat Map component, including the map and all it's children (e.g. pins/markers).
 * @component
 * @returns {JSX.Element} JSX element of the map
 */



export default function CatMap({ navigation }: RootTabScreenProps<"Home">) {
  const [cats, setCats] = useState<Cat[]>([]);
  
  const feedingStations = Stations
  const mapViewRef: React.MutableRefObject<MapView> | React.MutableRefObject<null> = useRef(null);
  const catsRef = firebase.database().ref().child('Cats/');

  const myLocation = Gps();
  const newState: Cat[] = [];

  useEffect(() => {
    catsRef.on('child_added', (snapshot) => {
      newState.push(snapshot.val());
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
              longitude: cat.location.longitude
            }}>
            <Image
              style={{ width: 50, height: 50, borderWidth: 5, borderColor: "#a52a2a" }}
              source={{
                uri: cat.media,
              }}
            />
          </Marker>
        ))}

        {feedingStations?.map((feedingStations, index) => (
          <Marker 
            key={index}
            onPress={() => {
              navigation.push('FeedingStationModal',{
                title: feedingStations.street,
              }) //this is navigation to one of the child screens when button is clicked
            }}
            coordinate={{
              latitude: feedingStations.latitude,
              longitude: feedingStations.longitude,
            }
            }>
            <Image 
              style={{ width: 35, height: 35 }}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/2809/2809799.png"
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});

