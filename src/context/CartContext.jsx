import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { lineTotal } from '../constants/data';

/* eslint-disable react-refresh/only-export-components */

const CartContext = createContext(null);
const STORAGE_KEY = 'willmars-cart';

export function CartProvider({ children }) {
  const [lines, setLines] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  const addLine = (line) => {
    setLines((prev) => {
      const match = prev.find((entry) => entry.key === line.key);
      if (match) {
        return prev.map((entry) =>
          entry.key === line.key ? { ...entry, qty: entry.qty + line.qty } : entry
        );
      }
      return [...prev, line];
    });
    setIsOpen(true);
  };

  const updateQty = (key, qty) => {
    setLines((prev) =>
      prev
        .map((entry) => (entry.key === key ? { ...entry, qty } : entry))
        .filter((entry) => entry.qty > 0)
    );
  };

  const removeLine = (key) => setLines((prev) => prev.filter((entry) => entry.key !== key));
  const clearCart = () => setLines([]);

  const count = lines.reduce((sum, line) => sum + line.qty, 0);
  const subtotal = lines.reduce((sum, line) => sum + line.unitPrice * line.qty, 0);

  const value = useMemo(
    () => ({
      lines,
      isOpen,
      setIsOpen,
      addLine,
      updateQty,
      removeLine,
      clearCart,
      count,
      subtotal,
    }),
    [lines, isOpen, count, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export function buildCartLine(item, qty, selectedOptions, selectedExtras) {
  const extras = (item.extras || []).filter((extra) => selectedExtras.includes(extra.id));
  const optionLabels = Object.entries(selectedOptions).map(([groupId, choiceId]) => {
    const group = item.options?.find((opt) => opt.id === groupId);
    const choice = group?.choices?.find((c) => c.id === choiceId);
    return `${group?.label}: ${choice?.name}`;
  });
  const unitPrice = lineTotal(item, 1, selectedOptions, selectedExtras);
  const key = JSON.stringify({ id: item.id, selectedOptions, selectedExtras: [...selectedExtras].sort() });
  return {
    key,
    itemId: item.id,
    name: item.name,
    image: item.image,
    qty,
    unitPrice,
    optionLabels,
    extraLabels: extras.map((extra) => extra.name),
  };
}
