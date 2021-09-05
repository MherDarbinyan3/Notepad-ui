import { useState } from 'react';

export const useLocalStorage = (key: string, initialValue: [] = []): any => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value: string) => {
    window.localStorage.setItem(key, JSON.stringify(value));
    setStoredValue(value);
  }

  const removeValue = (value: string = '') => {
    window.localStorage.removeItem(key);
    setStoredValue(value);
  }

  return [storedValue, setValue, removeValue];
}
