import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import { AuthProvider } from './context/FirebaseAuthProvider';
import Navigation from './navigation/index';
import { LogBox } from 'react-native';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  if (!isLoadingComplete) {
    return null;
  }

  LogBox.ignoreLogs([new RegExp('^Setting a timer')]);

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Navigation colorScheme={colorScheme} />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
