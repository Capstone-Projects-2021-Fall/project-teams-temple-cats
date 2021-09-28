import { StatusBar } from 'expo-status-bar';
import React from 'react';
//import { createStackNavigator, createAppContainer } from "react-navigation";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import Home from './screens/Home';
import {StyleSheet, Text, View } from "react-native";
//import Login from './components/Login'

export default function App() {
  return(
    <Home></Home>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

//export default App;


/*const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      
      </SafeAreaProvider>
    );
  }*/