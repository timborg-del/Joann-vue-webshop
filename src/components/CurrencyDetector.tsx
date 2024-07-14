import { createContext, useState, useEffect, ReactNode } from 'react';

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
        // Fetch the user's location based on their IP address
        const locationResponse = await fetch('https://ipapi.co/json/');
        if (!locationResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const locationData = await locationResponse.json();
        const countryCode = locationData.country_code;

        const countryCurrencyMap: { [key: string]: string } = {
          'US': 'USD',
          'GB': 'GBP',
          'DE': 'EUR',
          'SE': 'SEK',
          // Add more mappings as needed
        };

        const detectedCurrency = countryCurrencyMap[countryCode] || 'SEK';
        setCurrency(detectedCurrency);

        // Fetch the conversion rate if the detected currency is not SEK
        if (detectedCurrency !== 'SEK') {
          const rateResponse = await fetch(`https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/SEK`);
          if (!rateResponse.ok) {
            throw new Error('Rate response was not ok');
          }
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




