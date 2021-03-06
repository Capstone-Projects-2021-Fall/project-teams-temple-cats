import * as React from 'react';
import { useState } from 'react';
import { Polygon } from 'react-native-maps';

/**
 * Function that renders border of Temple's Campus. Used to indicate where users can earn points.
 * @component
 * @returns {JSX.Element} JSX element that displays border or Temple's Campus on the map view
 */
export default function TUMapBorder() {
  const [strokeColor, setStrokeColor] = useState<string | undefined>(undefined);
  const [fillColor, setFillColor] = useState<string | undefined>(undefined);

  React.useEffect(() => {
    setTimeout(() => {
      setStrokeColor('rgba(157, 34, 53, 1)');
      setFillColor('rgba(157, 34, 53, 0.05)');
    }, 1000);
  });
  return (
    <Polygon
      coordinates={[
        { latitude: 39.975237221562914, longitude: -75.16531142948794 },
        { latitude: 39.99028527887604, longitude: -75.16201582672468 },
        { latitude: 39.98821021677819, longitude: -75.14598521349043 },
        { latitude: 39.9731936067945, longitude: -75.14928693177747 },
      ]}
      strokeWidth={2}
      strokeColor={strokeColor}
      fillColor={fillColor}
    />
  );
}
