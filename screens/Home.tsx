import * as React from "react";
import CatMap from "../components/CatMap";
import { RootTabScreenProps } from "../types";

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  return <CatMap />;
}
