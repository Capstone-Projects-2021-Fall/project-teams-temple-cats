import React, { Component } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation/index";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
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
        <Navigation colorScheme={colorScheme} />
        </AuthProvider>
      </SafeAreaProvider>
    );
  }
}




