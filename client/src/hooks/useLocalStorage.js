import { useState, useEffect } from "react";

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = window.localStorage.getItem("settings");
      if (storedValue !== null) {
        return JSON.parse(storedValue);
      }
      return defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    const listenStorageChangesForKey = (e) => {
      if(e.storageArea === window.localStorage && e.key === key) {
        setValue(e.newValue);
      }
    };
    window.addEventListener('storage', listenStorageChangesForKey);

    return () => window.removeEventListener('storage', listenStorageChangesForKey);
  }, [key, defaultValue]);

  
  const setValueInLocalStorage = (newValue) => {
    let result = newValue;

    setValue((currentValue) => {
      if (typeof newValue === "function") {
        result = newValue(currentValue);
      }
    });
    window.localStorage.setItem(key, JSON.stringify(result))
    window.dispatchEvent(new Event('storage'));
    return result;
  };

  const clearValueFromLocalStorage = () => {
    setValue(null);
    window.localStorage.removeItem(key);
  };

  return [value, setValueInLocalStorage, clearValueFromLocalStorage];
};

export default useLocalStorage;