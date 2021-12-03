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


/**
 * Root component for the app. Uses authentication and navigation provider to manage interface.
 * @component
 * @returns {JSX.Element} JSX element of the root app
 */
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

  /**
   * Configures a default error handler using built-in react native functionality to be used if any unexpected, uncaught front-end error occur during runtime. Can also be configured to send bug reports to the dev team.
   * @function configureErrorHandler
   */
  function configureErrorHandler() {
    const defaultErrorHandler = ErrorUtils.getGlobalHandler();
    const myErrorHandler = (e: any, isFatal: boolean | undefined) => {
      // logic if we wanted our own error handler here
    }
    ErrorUtils.setGlobalHandler(defaultErrorHandler);
  }
}
