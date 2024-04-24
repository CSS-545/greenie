import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";

const Home = () => {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#8cf078" style="dark" />

      <View style={styles.root}>
        <View style={styles.heroIllustration}>
          <View style={styles.girlImageContainer}>
            <Image
              source={require("../assets/home/Hero.png")}
              style={styles.girlImage}
            />
          </View>
        </View>

        <View style={styles.heroContentContainer}>
          <Text style={styles.heroTitle}>
            <Text style={styles.highlight}>Unlock Opportunities</Text>
            {"\n"}With Pre-Verified{"\n"}Professionals
          </Text>
          <Text style={styles.heroText}>
            Experience verifications, document storage, contract creation,
            sharing of verification reports on our secure encrypted platform.
          </Text>

          <TouchableOpacity onPress={() => router.replace("/dashboard")}>
            <View style={styles.heroActionBtn}>
              <View style={styles.googleButton}>
                <Image
                  source={require("../assets/home/google-icon.png")}
                  style={styles.googleLogo}
                />
                <Text style={styles.tryForFree}>Sign in with Google</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "flex-start",
  },
  highlight: {
    color: "#8cf078",
  },
  heroContentContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    maxWidth: "45ch",
    width: "100%",
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 16,
    textAlign: "center",
  },
  heroText: {
    fontSize: 14,
    marginBottom: 16,
    textAlign: "center",
  },
  heroActionBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8cf078",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  googleLogo: {
    width: 24,
    height: 24,
  },
  tryForFree: {
    fontSize: 18,
    color: "black",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  heroIllustration: {
    zIndex: -1,
    width: "98%",
  },
  girlImageContainer: {
    aspectRatio: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    alignSelf: "center",
  },
  girlImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default Home;
