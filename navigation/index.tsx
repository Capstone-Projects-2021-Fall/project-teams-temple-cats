/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import Announcements from "../screens/AnnouncementsModal";
import Leaderboard from "../screens/Leaderboard";
import Home from "../screens/Home";
import Account from "../screens/Account";
import Resources from "../screens/Resources";
import Login from "../screens/Login";
import CatForm from "../screens/CatForm"
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import { AuthContext } from "../context/FirebaseAuthContext";


/**
 * Function that renders the navigation bar component.
 * @component
 * @param {{colorScheme: ColorSchemeName}} props
 * @param {ColorSchemeName} props.colorScheme ColorSchemeName to decide the color scheme of the component
 * @returns {JSX.Element} JSX element of the navigation component
 */




export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const user = React.useContext(AuthContext);
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      {!user ? <Login /> : <RootNavigator />}
    </NavigationContainer>
  );
}

/**
 * A root stack navigator used for displaying a navigation modal on top of all other content.
 * https://reactnavigation.org/docs/modal
 * @constant {TypedNavigator}
 * @memberof Navigation
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Function that renders a root navigator as an inner component for the navigation bar.
 * @returns {JSX.Element} JSX element of the root navigator
 * @memberof Navigation
 */
function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
        <Stack.Screen name="Announcements" component={Announcements} />
      </Stack.Group>
      
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="CatForm" component={CatForm} />
      </Stack.Group>
    </Stack.Navigator>
    
  );
}


/**
 * A bottom tab navigator using for displaying tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 * @constant {TypedNavigator}
 * @memberof Navigation
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

/**
 * Function that renders a bottom tab navigator for the root of the root navigator.
 * @returns {JSX.Element} JSX element of the bottom tab navigator.
 * @memberof Navigation
 */
function BottomTabNavigator() {
  /**
   * Color scheme for the navigator
   * @constant {"light" | "dark"}
   */
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={({ navigation }: RootTabScreenProps<"Home">) => ({
          title: "Home",
         
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.navigate("CatForm")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="plus"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginLeft: 15 }}
              />
            </Pressable>
          ),
         
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Announcements")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />

      <BottomTab.Screen
        name="Resources"
        component={Resources}
        options={{
          title: "Resources",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Leaderboard"
        component={Leaderboard}
        options={{
          title: "Leaderboard",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={Account}
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * Function that renders the component to be used as icons for the tab bar.
 * @param props
 * @param {string} props.name Name of the icon
 * @param {string} props.color Color of the icon
 * @returns {JSX.Element} JSX element of the icon
 * @memberof Navigation
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
