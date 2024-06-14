import { useState } from 'react';

// Hook to use local storage
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      console.log(`Retrieving key "${key}" from localStorage:`, item);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading key "${key}" from localStorage:`, error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
      console.log(`Stored key "${key}" in localStorage:`, value);
    } catch (error) {
      console.error(`Error setting key "${key}" in localStorage:`, error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;



