

import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { MainStackNavigator } from "./navigation/StackNavigator";

const App = () => {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
};
export default App;

/*
  
*/
 //
      



/*import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
//import Login from './components/Login'

export default function App() {
  const isLoadingComplete = useCachedResources();
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
  }
}*/

//export default App;
