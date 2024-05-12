import React, { createContext, useContext, useEffect, useState } from 'react';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLocationVerified, setIsLocationVerified] = useState(false);

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
