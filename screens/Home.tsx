import * as React from "react";
import CatMap from "../components/CatMap";
import { RootTabScreenProps } from "../types";

/**
 * Function that renders the home screen. This is the main screen that includes the lost & found map and reporting features.
 * @component
 * @param {RootTabScreenProps} props navigation properties from the root of the home button in navigation
 * @returns {JSX.Element} JSX element of the home screen
 */

export default function HomeScreen ( navigation: RootTabScreenProps<"Home"> ) {
  return CatMap(navigation);
}
