import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface CurrencyContextProps {
  currency: string;
  setCurrency: (currency: string) => void;
  convertPrice: (priceInSEK: number) => number;
}

export const CurrencyContext = createContext<CurrencyContextProps>({
  currency: 'SEK',
  setCurrency: () => {},
  convertPrice: (priceInSEK: number) => priceInSEK,
});

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const [currency, setCurrency] = useState<string>('SEK');
  const [conversionRate, setConversionRate] = useState<number>(1);

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

        const detectedCurrency = countryCurrencyMap[countryCode] || 'SEK';
        setCurrency(detectedCurrency);

        if (detectedCurrency !== 'SEK') {
          const rateResponse = await fetch(`https://v6.exchangerate-api.com/v6/a1232edc656cf6fb88a4db06/latest/SEK`);
          const rateData = await rateResponse.json();
          setConversionRate(rateData.conversion_rates[detectedCurrency]);
        } else {
          setConversionRate(1); // 1:1 conversion for SEK
        }
      } catch (error) {
        console.error('Error fetching location or conversion data:', error);
        setCurrency('SEK'); // Default to SEK on error
        setConversionRate(1); // Default to 1:1 conversion on error
      }
    };

    fetchCurrency();
  }, []);

  const convertPrice = (priceInSEK: number) => priceInSEK * conversionRate;

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};



