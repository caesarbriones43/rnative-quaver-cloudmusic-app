import * as React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Tab Screens
//Public
import HomeScreen from "./HomeScreen";
import PlayingScreen from "./PlayingScreen";
import DiscoverMusicScreen from "./DiscoverMusicScreen";
import ManageScreen from "../private/ManageScreen";

const Tab = createBottomTabNavigator();

const HomeTabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Discover Music") {
            color = "#000000";
            iconName = focused ? "musical-notes" : "musical-notes-outline";
          } else if (route.name === "Play") {
            color = "#000000";
            iconName = focused ? "play-circle" : "pause-circle-outline";
          } else if (route.name === "Home") {
            color = "#000000";
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Manage") {
            color = "#000000";
            iconName = focused ? "lock-open" : "lock-closed-outline";
          } else {
            color = "#000000";
            iconName = focused ? "rocket" : "rocket-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "black",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Play" component={PlayingScreen} />
      <Tab.Screen name="Discover Music" component={DiscoverMusicScreen} />
      {/* <Tab.Screen name="Manage" component={ManageScreen} /> */}
    </Tab.Navigator>
  );
};

export default HomeTabScreen;
