import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface CurrencyContextProps {
  currency: string;
  setCurrency: (currency: string) => void;
}

export const CurrencyContext = createContext<CurrencyContextProps>({
  currency: 'USD',
  setCurrency: () => {},
});

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const [currency, setCurrency] = useState<string>('USD');

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const countryCode = data.country_code;

        const countryCurrencyMap: { [key: string]: string } = {
          'US': 'USD',
          'GB': 'GBP',
          'DE': 'EUR',
          'SE': 'SEK',
          // Add more mappings as needed
        };

        const detectedCurrency = countryCurrencyMap[countryCode] || 'USD';
        setCurrency(detectedCurrency);
      } catch (error) {
        console.error('Error fetching location data:', error);
        setCurrency('USD'); // Default to USD on error
      }
    };

    fetchCurrency();
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};



