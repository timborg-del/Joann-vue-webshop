import { useEffect, useState } from "react";

const useFetchData = (url: string) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null); // Explicit typing for the error state

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch data: ' + response.status + ' ' + response.statusText);
                }
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error(error); // Log the error for debugging
                setError(error as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, isLoading, error };
};

export default useFetchData;




