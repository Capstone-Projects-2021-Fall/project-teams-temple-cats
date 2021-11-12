import * as React from 'react';
import { Polygon } from 'react-native-maps';

export default function TUMapBorder() {
  return (
    <Polygon
      coordinates={[
        { latitude: 39.975237221562914, longitude: -75.16531142948794 },
        { latitude: 39.99028527887604, longitude: -75.16201582672468 },
        { latitude: 39.98821021677819, longitude: -75.14598521349043 },
        { latitude: 39.9731936067945, longitude: -75.14928693177747 },
      ]}
      strokeWidth={2}
      strokeColor="rgba(157, 34, 53, 1)"
      fillColor="rgba(157, 34, 53, 0.05)"
    />
  );
}
