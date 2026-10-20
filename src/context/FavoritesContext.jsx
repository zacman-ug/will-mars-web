import { createContext, useContext, useEffect, useState } from 'react';

/* eslint-disable react-refresh/only-export-components */

const FavoritesContext = createContext(null);
const STORAGE_KEY = 'willmars-favorites';

export function FavoritesProvider({ children }) {
  const [ids, setIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, [ids]);

  const toggle = (id) => {
    setIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const has = (id) => ids.includes(id);

  return (
    <FavoritesContext.Provider value={{ ids, toggle, has }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}
