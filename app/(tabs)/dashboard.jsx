import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CardTemplate = ({ heading, length, subheading, buttonText, onPress, isVerified, locationData }) => {
  return (
    <View style={styles.residentialInfo}>
      <View style={styles.header}>
        <Text style={styles.heading}>{`${heading} (${length})`}</Text>
        <Text style={styles.subheading}>{subheading}</Text>
      </View>

      {!isVerified ? (
        <View style={styles.noDataWrapper}>
          <Image style={styles.image} source={require('../../assets/dashboard/noData.png')} alt="No data" />
          <TouchableOpacity style={styles.addRecords} onPress={onPress}>
            <AntDesign size={14} name="plus" color="black" style={{ marginRight: 5 }} />
            <Text>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.verifiedCard}>
          <View style={styles.addressRow}>
            <View style={styles.locationIcon}>
              <Entypo name="location-pin" size={24} />
            </View>
            <Text style={styles.addressText}>
              {`${locationData.address}, ${locationData.landmark}, ${locationData.city}, ${locationData.state}, ${locationData.country}, ${locationData.pincode}`}
            </Text>
          </View>
          <View style={styles.verifiedChipWrapper}>
            <Text style={styles.verifiedChip}>Verified</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.sinceText}>Since</Text>
            <Text style={styles.dateRange}>{`${locationData.startDate} - ${locationData.endDate}`}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Dashboard = () => {
  const { isLocationVerified, locationData, setLocationData } = useGlobalContext();

  const fetchDataFromStorage = async () => {
    const data = await AsyncStorage.getItem('locationData');
    console.log('data before', data);
    if (data) {
      const parsedLocationData = JSON.parse(data);
      console.log('data after', parsedLocationData);
      setLocationData(parsedLocationData);
    }
  };

  useEffect(() => {
    fetchDataFromStorage();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#8cf078" style="dark" />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.profileSection}>
          <View style={styles.coverPhoto}></View>

          <View style={styles.profilePhoto}>
            <Image source={require('../../assets/dashboard/dp.jpeg')} style={styles.profileImage} />
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

        <CardTemplate
          heading="Residential Information"
          length={0}
          subheading="All your permanent and temporary addresses"
          buttonText="add address"
          onPress={() => {
            router.push('/location');
          }}
          isVerified={isLocationVerified}
          locationData={locationData}
        />
        <CardTemplate
          heading="Work Experience"
          length={0}
          subheading="All your past and present work experience"
          buttonText="add experience"
          onPress={() => {
            router.push('/work');
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  bioSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  bioName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  coverPhoto: {
    height: 200,
    backgroundColor: '#a5fbc9',
    borderRadius: 50,
    width: '94%',
    maxWidth: 960,
    zIndex: 0,
    position: 'relative',
  },
  profilePhoto: {
    width: 201,
    height: 200,
    borderWidth: 8,
    borderColor: '#ffffff',
    borderRadius: 100,
    marginTop: -150,
    zIndex: 1,
    position: 'relative',
    backgroundColor: '#e1e1e1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  chips: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  group: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 20,
    backgroundColor: '#eaeaea',
    fontSize: 14,
  },
  residentialInfo: {
    marginTop: 20,
  },
  residentialInfo: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 1.5,
  },
  header: {
    padding: 20,
    paddingBottom: 0,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subheading: {
    fontSize: 14,
    color: '#757575',
  },
  noDataWrapper: {
    padding: 20,
    alignItems: 'center',
  },
  noData: {
    marginBottom: 20,
  },
  addRecords: {
    backgroundColor: 'transparent',
    borderColor: '#4caf50',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  verifiedCard: {
    padding: 10,
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 8,
    color: '#000',
    borderRadius: 50,
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000',
    borderWidth: 0.5,
  },
  addressText: {
    fontSize: 16,
    color: '#000',
    flex: 1,
    flexWrap: 'wrap',
  },
  verifiedChipWrapper: {
    alignItems: 'center',
    marginVertical: 5,
  },
  verifiedChip: {
    backgroundColor: '#8cf078',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 12,
    fontSize: 12,
  },
  dateContainer: {
    marginTop: 5,
  },
  sinceText: {
    fontSize: 14,
    color: '#666',
  },
  dateRange: {
    fontSize: 14,
    color: '#666',
  },
});
