import { createContext, useContext, useState, useEffect } from 'react';

const MyOrdersContext = createContext();

const STORAGE_KEY = 'hallo_my_orders';

export const MyOrdersProvider = ({ children }) => {
  const [myOrders, setMyOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(myOrders));
  }, [myOrders]);

  const saveOrder = (order) => {
    // order = { orderNumber, email, name, total, date, items }
    setMyOrders((prev) => {
      // Prevent duplicates
      if (prev.some(o => o.orderNumber === order.orderNumber)) return prev;
      return [order, ...prev];
    });
  };

  const clearMyOrders = () => setMyOrders([]);

  return (
    <MyOrdersContext.Provider value={{ myOrders, saveOrder, clearMyOrders }}>
      {children}
    </MyOrdersContext.Provider>
  );
};

export const useMyOrders = () => useContext(MyOrdersContext);