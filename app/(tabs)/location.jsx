import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useGlobalContext } from '../../context/GlobalProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import { getSuggestion, getCoordinatesFromAddress, getCoordinatesFromPlaceID, withinDistance } from '../../lib/maps';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const LocationScreen = () => {
  const { setIsLocationVerified } = useGlobalContext();

  const [locationData, setLocationData] = useState({
    address: '',
    landmark: '',
    city: '',
    pincode: '',
    state: '',
    country: '',
    startDate: '',
    endDate: '',
  });

  const [expectedLatlong, setExpectedLatLong] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [actualLatlong, setActualLatLong] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [showGPS, setShowGPS] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');

  useEffect(() => {
    setLocationData({
      address: '',
      landmark: '',
      city: '',
      pincode: '',
      state: '',
      country: '',
      startDate: '',
      endDate: '',
    });
  }, []);

  const handleInputChange = (name, value) => {
    setLocationData({
      ...locationData,
      [name]: value,
    });
  };

  const handleSave = () => {
    const formattedAddress = `${locationData.address}, ${locationData.landmark}, ${locationData.city}, ${locationData.state}, ${locationData.country}, ${locationData.pincode}`;

    getCoordinatesFromAddress(formattedAddress)
      .then((res) => {
        if (res && res.results && res.results.length > 0 && res.results[0].geometry) {
          const { geometry } = res.results[0];

          setExpectedLatLong({
            latitude: geometry.location.lat ?? 0,
            longitude: geometry.location.lng ?? 0,
          });

          setShowGPS(true);
        } else {
          console.error('Invalid response format:', res);
        }
      })
      .catch((error) => {
        console.error('Error fetching coordinates:', error);
      });
  };

  const handleBack = () => {
    setShowGPS(false);
  };

  const handleSearch = (address) => {
    setShowDropdown(true);
    setSelectedAddress(address);
    getSuggestion(address).then((data) => {
      setSearchData(data.predictions);
    });
  };

  const findPlaceId = (searchString) => {
    for (const item of searchData) {
      if (item.structured_formatting.main_text === searchString) {
        const [address, landmark, city, state, country] = item.description.split(',').map((item) => item.trim());
        setLocationData((prevData) => ({
          ...prevData,
          address: address,
          landmark: landmark,
          city: city,
          state: state,
          country: country,
        }));

        return item.place_id;
      }
    }
  };

  const handleSelectAddress = (address) => {
    const placeID = findPlaceId(address);
    getCoordinatesFromPlaceID(placeID).then((data) => {
      setExpectedLatLong({
        latitude: data.results[0].geometry.location.lat,
        longitude: data.results[0].geometry.location.lng,
      });
    });

    setSelectedAddress(address);
    setShowDropdown(false);
  };

  const captureLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({});
      setActualLatLong({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      Alert.alert('Error fetching location: ' + error.message);
    } finally {
      // console.log('Actual Latlong:', actualLatlong);
      // console.log('Expected Latlong:', expectedLatlong);
      const isWithinDistance = withinDistance(expectedLatlong, actualLatlong);
      // console.log(isWithinDistance);
      setIsLocationVerified(isWithinDistance);
      Alert.alert('Location captured successfully');
      router.push('/dashboard');
      setShowGPS(false);
    }
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
                value={selectedAddress}
                placeholder="Search your address"
                onFocus={() => setShowDropdown(true)}
                onChangeText={(text) => handleSearch(text)}
              />
            </View>
            {showDropdown && (
              <View style={styles.dropdown}>
                {searchData.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleSelectAddress(item.structured_formatting.main_text)}
                  >
                    <Text style={styles.addressItem}>{item.structured_formatting.main_text}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <MapView
              style={styles.map}
              initialRegion={{
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                latitude: expectedLatlong.latitude,
                longitude: expectedLatlong.longitude,
              }}
              region={{
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                latitude: expectedLatlong.latitude,
                longitude: expectedLatlong.longitude,
              }}
            >
              <Marker coordinate={expectedLatlong} />
            </MapView>

            <TextInput
              placeholder="Address Line 1"
              value={locationData.address}
              style={{ ...styles.input, marginBottom: 10 }}
              onChangeText={(text) => handleInputChange('address', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Landmark"
              value={locationData.landmark}
              onChangeText={(text) => handleInputChange('landmark', text)}
            />
            <View style={styles.inlineInputs}>
              <TextInput
                placeholder="City"
                value={locationData.city}
                style={[styles.input, { flex: 1 }]}
                onChangeText={(text) => handleInputChange('city', text)}
              />
              <TextInput
                placeholder="Pincode"
                value={locationData.pincode}
                style={[styles.input, { flex: 1 }]}
                onChangeText={(text) => handleInputChange('pincode', text)}
              />
            </View>
            <View style={styles.inlineInputs}>
              <TextInput
                placeholder="State"
                value={locationData.state}
                style={[styles.input, { flex: 1 }]}
                onChangeText={(text) => handleInputChange('state', text)}
              />
              <TextInput
                placeholder="Country"
                value={locationData.country}
                style={[styles.input, { flex: 1 }]}
                onChangeText={(text) => handleInputChange('country', text)}
              />
            </View>

            <View style={styles.dateFields}>
              <TextInput
                placeholder="Start Date"
                value={locationData.startDate}
                style={[styles.input, { flex: 1 }]}
                onChangeText={(text) => handleInputChange('startDate', text)}
              />
              <TextInput
                placeholder="End Date"
                value={locationData.endDate}
                style={[styles.input, { flex: 1 }]}
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
                <TouchableOpacity style={styles.cardButton} onPress={captureLocation}>
                  <Text style={styles.cardButtonText}>Capture Location</Text>
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
    position: 'relative',
    borderWidth: 1,
    borderColor: '#ddd',
    maxHeight: 160,
    overflow: 'scroll',
    elevation: 0.5,
  },
  addressItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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

export default LocationScreen;
