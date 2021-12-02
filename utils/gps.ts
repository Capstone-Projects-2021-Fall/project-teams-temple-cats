import { useState, useEffect } from "react";
import * as Location from "expo-location";

/**
 * Grabs the current location of the user. It first checks if permission for location has been granted to the app.
 * If permissions hasn't been granted then it is requested. If granted it returned a Region object with the current location. If
 * it is denied it returns a default region object of Temple's Campus.
 * @default region: { latitude: 39.9812, longitude: -75.1497, latitudeDelta: 0.015, longitudeDelta: 0.0121 }
 * @returns Region object containing current location if permissions are approved. Otherwise a default region of Temple is returned.
 */
export default function Gps () {
  const [location, setLocation] = useState({
    latitude: 39.9812,
    longitude: -75.1497,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121
  });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {

      } else {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced
        });
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121
        });
      }
    })();
  }, []);

  return location;
}
