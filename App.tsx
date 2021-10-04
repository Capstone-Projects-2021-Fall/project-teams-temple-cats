import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation/index";
import CatMap from "./components/CatMap"
import LoginScreen from "./screens/Login"

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import { AuthContext } from "./context/FirebaseAuthContext";
import { AuthProvider } from "./context/FirebaseAuthProvider";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthProvider>
          <CatMap />
        </AuthProvider>
      </SafeAreaProvider>
    );
  }
}
