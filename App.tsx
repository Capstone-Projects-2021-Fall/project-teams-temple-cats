import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import { AuthProvider } from "./context/FirebaseAuthProvider";
import Navigation from "./navigation/index";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthProvider>
        <Navigation colorScheme={colorScheme} />
        </AuthProvider>
      </SafeAreaProvider>
    );
  }
}
