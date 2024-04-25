import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

export default Dashboard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#8cf078" style="dark" />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
          <Text style={styles.bioName}>Swanand Wagh</Text>
        </View>

        <View style={styles.chips}>
          <View style={styles.group}>
            <Text style={styles.chip}>Team Player</Text>
            <Text style={styles.chip}>Lone Warrior</Text>
            <Text style={styles.chip}>Self Initiator</Text>
          </View>
        </View>

        <View style={styles.residentialInfo}>
          <View style={styles.header}>
            <View>
              <Text
                style={styles.heading}
              >{`Residential Information (0)`}</Text>
              <Text style={styles.subheading}>
                All your permanent and temporary addresses
              </Text>
            </View>

            <View style={styles.headerLinks}>
              <TouchableOpacity>
                <Text style={styles.link}>See All Addresses</Text>
              </TouchableOpacity>
              <Button
                title="Add Address"
                leftIcon={<AntDesign name="edit" size={24} color="black" />}
                style={styles.editBtn}
              />
            </View>
            <TouchableOpacity style={styles.editIcon}>
              <AntDesign name="edit" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.noDataWrapper}>
            <Image
              style={styles.noData}
              source={require("../../assets/dashboard/noData.png")}
              alt="No data"
            />
            <Button
              title="Add Address"
              leftIcon={<AntDesign name="plus" size={24} color="black" />}
              style={styles.addRecords}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  bioSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  bioName: {
    fontSize: 18,
    fontWeight: "bold",
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
  chips: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  group: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 20,
    backgroundColor: "#eaeaea",
    fontSize: 14,
  },
  residentialInfo: {
    marginTop: 20,
  },
  header: {
    // Header styles
  },
  heading: {
    // Heading styles
  },
  subheading: {
    // Subheading styles
  },
  headerLinks: {
    // Header links styles
  },
  link: {
    // Link styles
  },
  editBtn: {
    // Edit button styles
  },
  editIcon: {
    // Edit icon styles
  },
  noDataWrapper: {
    // No data wrapper styles
  },
  noData: {
    // No data image styles
  },
  addRecords: {
    // Add records button styles
  },
});
