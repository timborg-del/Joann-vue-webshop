import React, { createContext, useState, useEffect, ReactNode } from 'react';

const getUserCurrency = (): string => {
  const userLocale = navigator.language;

  const localeCurrencyMap: { [key: string]: string } = {
    'en-US': 'USD',
    'en-GB': 'GBP',
    'de-DE': 'EUR',
    'sv-SE': 'SEK',
    // Add more mappings as needed
  };

  return localeCurrencyMap[userLocale] || 'USD'; // Default to USD if locale is not mapped
};

interface CurrencyContextProps {
  currency: string;
  setCurrency: (currency: string) => void;
}

export const CurrencyContext = createContext<CurrencyContextProps>({
  currency: 'USD',
  setCurrency: () => {},
});

type CurrencyProviderProps = {
  children: ReactNode;
};

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const [currency, setCurrency] = useState<string>('USD');

  useEffect(() => {
    const detectedCurrency = getUserCurrency();
    setCurrency(detectedCurrency);
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};


