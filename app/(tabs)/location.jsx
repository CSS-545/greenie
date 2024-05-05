import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons"; 
import { Entypo } from "@expo/vector-icons";

const Location = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Add Residential Information</Text>
      <Text style={styles.label}>Enter your location *</Text>
      <View style={styles.tipContainer}>
        <Entypo name="info-with-circle" size={24} color="#000" />
        <Text style={styles.tipText}>
          Pro Tip: Search for a precise address, however if you encounter
          difficulty in locating your address, rest assured that the system will
          identify accuracy within 250 meters radius.
        </Text>
      </View>
      <View style={styles.searchSection}>
        <Ionicons name="location-outline" size={24} color="black" />
        <TextInput style={styles.input} placeholder="Search your address"/>
      </View>
    </SafeAreaView>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  tipContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(140, 240, 120, .5)",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  tipText: {
    marginLeft: 10,
    fontSize: 14,
    color: "black",
  },
  searchSection: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    outline: "none",
  },
  input: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
    outline: "none",
    border: "none",
  },
});
