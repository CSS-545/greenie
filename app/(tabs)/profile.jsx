import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#8cf078" style="dark" />

      <Text style={styles.header}>Update Profile</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Your first name *"
          value={firstName}
          onChangeText={setFirstName}
        />
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Your last name *"
          value={lastName}
          onChangeText={setLastName}
        />
        <Text style={styles.label}>Tell Us about yourself</Text>
        <TextInput
          style={styles.inputBio}
          placeholder="Your bio *"
          value={bio}
          onChangeText={setBio}
          multiline
        />
        <Text style={styles.label}>Introduce yourself in 3 words</Text>
        <View style={styles.chips}>
          <View style={styles.group}>
            <Text style={styles.chip}>Team Player</Text>
            <Text style={styles.chip}>Lone Warrior</Text>
            <Text style={styles.chip}>Self Initiator</Text>
            <Text style={styles.chip}>Energetic</Text>
            <Text style={styles.chip}>Prodigy</Text>
            <Text style={styles.chip}>Hardworking</Text>
            <Text style={styles.chip}>Optimistic</Text>
            <Text style={styles.chip}>Micro Planner</Text>
            <Text style={styles.chip}>Jack of All</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    borderRadius: 5,
  },
  inputBio: {
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    borderRadius: 5,
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#8cf078",
    padding: 15,
    borderRadius: 5,
  },
  chips: {
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "center",
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
  buttonText: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },
});
