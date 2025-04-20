// Custom hook untuk menyimpan dan mengambil data dari localStorage
import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  // Menginisialisasi state dengan nilai dari localStorage (jika ada)
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Gagal mengambil dari localStorage", error);
      return initialValue;
    }
  });

  // Update localStorage setiap kali storedValue berubah
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Gagal menyimpan ke localStorage", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;
