import { useState } from 'react';

function useLocalStorage<T>(key: string, initialValue: T): [T | null, (value: T | null) => void] {
  const [storedValue, setStoredValue] = useState<T | null>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading key "${key}" from localStorage:`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | null) => {
    try {
      if (value === null) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
      setStoredValue(value);
    } catch (error) {
      console.error(`Error setting key "${key}" in localStorage:`, error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;





