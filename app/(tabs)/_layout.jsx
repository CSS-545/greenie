import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { Image, Text, View, StyleSheet } from "react-native";

import { icons } from "../../constants/icons";
import { Loader } from "../../components/Loader";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: icon }}
        resizeMode="contain"
        tintColor={color}
        style={styles.icon}
      />
      <Text style={[styles.text, focused && styles.boldText]}>{name}</Text>
    </View>
  );
};

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
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#a5fbc9",
            height: 60,
          },
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Dashboard",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons?.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="location"
          options={{
            title: "Location",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons?.logout}
                color={color}
                name="Location"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="work"
          options={{
            title: "Work",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons?.logout}
                color={color}
                name="Work"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons?.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
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
