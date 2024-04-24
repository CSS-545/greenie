import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

const Dashboard = () => {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#8cf078" style="dark" />

      <View style={styles.profileSection}>
        <View style={styles.coverPhoto}></View>

        <View style={styles.profilePhoto}>
          <Image
            source={require("../../assets/dashboard/dp.jpeg")}
            style={styles.profileImage}
          />
        </View>
      </View>

      <View style={styles.bioSection}>
        <View style={styles.bioNameBox}>
          <Text style={styles.bioName}>Swanand Wagh</Text>
        </View>
        <TouchableOpacity style={styles.icon}>
          <MdOutlineEdit size={22} style={styles.btn} />
        </TouchableOpacity>
      </View>

      <View style={styles.chips}>
        <View style={styles.group}>
          <Text style={styles.chip}>Team Player</Text>
          <Text style={styles.chip}>Lone Warrior</Text>
          <Text style={styles.chip}>Self Initiator</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  bioSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  bioNameBox: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginLeft: 16,
  },
  bioName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  icon: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#eaeaea",
  },
  profileSection: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  coverPhoto: {
    height: 200,
    backgroundColor: "#a5fbc9",
    borderRadius: 50,
    width: "94%",
    maxWidth: 960,
    zIndex: 0,
    position: "relative",
  },
  profilePhoto: {
    width: 201,
    height: 200,
    borderWidth: 8,
    borderColor: "#ffffff",
    borderRadius: 100,
    marginTop: -150,
    zIndex: 1,
    position: "relative",
    backgroundColor: "#e1e1e1",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
});
