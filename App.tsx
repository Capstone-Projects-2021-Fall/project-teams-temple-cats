import React, {useEffect} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import { AuthProvider } from './context/FirebaseAuthProvider';
import Navigation from './navigation/index';
import { LogBox } from 'react-native';
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location';
import registerForPushNotification from './components/Notifications';


export default function App() {

  registerForPushNotification();

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
