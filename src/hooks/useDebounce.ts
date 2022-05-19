import { useEffect, useState, Dispatch } from 'react';

export const useDebounce = (searchText: string): string => {
  const [debouncedValue, setDebouncedValue] = useState(searchText);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(searchText), 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText]);

  return debouncedValue;
};
