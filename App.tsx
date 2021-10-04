import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
//import Login from './screens/Login';
//import CatForm from './components/Form.tsx/CatForm'
import { CatForm } from "c:/Users/cgreg/project-teams-temple-cats/components/Form.tsx/CatForm"





class App extends React.Component {
  public render() {
    return (
      <div className="mt-3">
        {<CatForm/>}
      </div>
    );
  }
}

export default App;

//export default function App() {
  //const isLoadingComplete = useCachedResources();
  //const colorScheme = useColorScheme();






/*
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Login/>
        <CatForm/>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}*/
//}

