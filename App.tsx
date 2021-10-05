import React, { Component } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation/index";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import { AuthContext } from "./context/FirebaseAuthContext";
import { AuthProvider } from "./context/FirebaseAuthProvider";

import { Switch } from "react-native";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import AddCatData from "./components/AddCatData";
import CatList from "./components/CatList";

import Firebase from "./utils/firebase";



/*
const function App() {
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
export default App
*/

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/tutorials"} className="navbar-brand">
            bezKoder
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/tutorials"} className="nav-link">
                Tutorials
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <h2>React Typescript Firebase example</h2>
          <Switch>
            <Route exact path={["/", "/Posts"]} component={CatList} />
            <Route exact path="/add" component={AddCatData} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;




