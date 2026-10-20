import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api';

/* eslint-disable react-refresh/only-export-components */

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [customer, setCustomer] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    api
      .me()
      .then((data) => {
        if (active) setCustomer(data.customer);
      })
      .catch(() => {
        if (active) setCustomer(null);
      })
      .finally(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      customer,
      ready,
      setCustomer,
      logout: async () => {
        try {
          await api.logout();
        } catch {
          /* still clear locally */
        }
        setCustomer(null);
      },
    }),
    [customer, ready]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
