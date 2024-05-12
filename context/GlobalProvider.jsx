import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert, AppState } from 'react-native';
import { auth } from '../lib/firebase';
import { router } from 'expo-router';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLocationVerified, setIsLocationVerified] = useState(false);

  const handleLogout = async () => {
    await auth
      .signOut()
      .then(() => {
        router.push('/login');
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  // State Management
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'inactive' || nextAppState === 'paused') {
        console.log('Logging out user...');
        handleLogout();
      }
    };

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLocationVerified,
        setIsLocationVerified,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
