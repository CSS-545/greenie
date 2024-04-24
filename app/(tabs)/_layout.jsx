import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { Image, Text, View, StyleSheet } from "react-native";

import { Loader } from "../../components/Loader";

import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const TabLayout = () => {
  //   const { loading, isLogged } = useGlobalContext();

  //   if (!loading && !isLogged) return <Redirect href="/sign-in" />;

  return (
    <>
      {/* <Loader isLoading={loading} /> */}
      <StatusBar backgroundColor="#8cf078" style="dark" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#8cf078",
          tabBarInactiveTintColor: "#fff",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#000",
            height: 60,
          },
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Dashboard",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Entypo name="home" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="location"
          options={{
            title: "Location",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Entypo name="location" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="work"
          options={{
            title: "Work",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Entypo name="suitcase" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons name="account" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabLayout;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  icon: {
    width: 24,
    height: 24,
  },
  text: {
    fontSize: 12,
    color: "#CDCDE0",
  },
  boldText: {},
});
