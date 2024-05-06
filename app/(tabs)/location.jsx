import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import MapView from 'react-native-maps';

const Location = () => {
  const [formData, setFormData] = useState({
    addressType: '',
    address: '',
    landmark: '',
    city: '',
    pincode: '',
    state: '',
    country: '',
    startDate: '',
    endDate: '',
  });

  const [showGPS, setShowGPS] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    setShowGPS(true);
  };

  const handleBack = () => {
    setShowGPS(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.header}>Add Residential Information</Text>
        <View style={styles.tipContainer}>
          <Entypo name="info-with-circle" size={24} color="#000" />
          <Text style={styles.tipText}>
            Pro Tip: Search for a precise address, however if you encounter difficulty in locating your address, rest
            assured that the system will identify accuracy within 250 meters radius.
          </Text>
        </View>
        {!showGPS ? (
          <>
            <Text style={styles.label}>Enter your location *</Text>
            <View style={{ ...styles.searchSection, marginBottom: 10 }}>
              <Ionicons name="location-outline" size={24} color="black" />
              <TextInput
                placeholder="Search your address"
                onChangeText={(text) => handleInputChange('address', text)}
              />
            </View>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />

            <TextInput
              style={{ ...styles.input, marginBottom: 10 }}
              placeholder="Address"
              onChangeText={(text) => handleInputChange('address', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Landmark"
              onChangeText={(text) => handleInputChange('landmark', text)}
            />
            <View style={styles.inlineInputs}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="City"
                onChangeText={(text) => handleInputChange('city', text)}
              />
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Pincode"
                onChangeText={(text) => handleInputChange('pincode', text)}
              />
            </View>
            <View style={styles.inlineInputs}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="State"
                onChangeText={(text) => handleInputChange('state', text)}
              />
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Country"
                onChangeText={(text) => handleInputChange('country', text)}
              />
            </View>

            <View style={styles.dateFields}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Start Date"
                onChangeText={(text) => handleInputChange('startDate', text)}
              />
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="End Date"
                onChangeText={(text) => handleInputChange('endDate', text)}
              />
            </View>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={() => handleSave()}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View style={styles.cardContainer}>
              <View style={styles.cardHeader}>
                <Ionicons name="location" size={24} color="#000" />
                <Text style={styles.cardHeaderText}>GPS is Off</Text>
              </View>
              <Text style={styles.cardMessage}>Please turn on your GPS to proceed.</Text>
              <View style={styles.cardButtons}>
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                  <Text style={styles.cardButtonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cardButton}>
                  <Text style={styles.cardButtonText}>Turn On GPS</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  tipContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(140, 240, 120, .5)',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  tipText: {
    marginLeft: 10,
    fontSize: 14,
    color: 'black',
    width: '90%',
  },
  searchSection: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    alignItems: 'center',
  },
  input: {
    fontSize: 14,
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  map: {
    flex: 1,
    minHeight: 200,
    marginBottom: 10,
  },
  dropdown: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  inlineInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 10,
  },
  dateFields: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10,
    gap: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#e63946',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#8cf078',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardContainer: {
    backgroundColor: '#f4f4f4',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  cardMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cardButton: {
    backgroundColor: '#8cf078',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cardButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
});

export default Location;
