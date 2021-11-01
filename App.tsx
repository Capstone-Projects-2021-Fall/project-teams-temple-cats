import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import { AuthProvider } from './context/FirebaseAuthProvider';
import Navigation from './navigation/index';
import CatForm from './screens/CatForm.tsx';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  if (!isLoadingComplete) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <CatForm />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
