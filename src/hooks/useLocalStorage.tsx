// src/hooks/useLocalStorage.tsx

import { useState } from 'react';

// Custom hook to interact with local storage
const useLocalStorage = <T,>(key: string, initialValue: T): [T, (value: T) => void] => {
  // Retrieve value from local storage or use initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error retrieving data from local storage:', error);
      return initialValue;
    }
  });

  // Function to update value in local storage
  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving data to local storage:', error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
