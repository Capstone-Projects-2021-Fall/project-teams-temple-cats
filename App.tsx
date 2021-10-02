import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Login from "./screens/Login";
import Navigation from "./navigation/index";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import { AuthContext } from "./context/FirebaseAuthContext";
import { AuthProvider } from "./context/FirebaseAuthProvider";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const user = React.useContext(AuthContext);

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
