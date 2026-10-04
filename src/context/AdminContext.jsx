import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  // 🔒 Locked ON — features are always enabled
  const [isFlashSaleOn] = useState(true);
  const [isNewArrivalsOn] = useState(true);

  const [newArrivalIds, setNewArrivalIds] = useState(() => {
    const saved = localStorage.getItem('newArrivalIds');
    return saved ? JSON.parse(saved) : [5, 6, 7]; // Default: all game consoles
  });

  const [flashSaleEndTime, setFlashSaleEndTime] = useState(() => {
    const saved = localStorage.getItem('flashSaleEndTime');
    if (saved) return parseInt(saved, 10);
    // Default: 30 days from now
    return new Date().getTime() + (30 * 24 * 60 * 60 * 1000);
  });

  useEffect(() => {
    localStorage.setItem('newArrivalIds', JSON.stringify(newArrivalIds));
    localStorage.setItem('flashSaleEndTime', flashSaleEndTime.toString());
  }, [newArrivalIds, flashSaleEndTime]);

  // Kept as no-ops so existing buttons don't crash
  const toggleFlashSale = () => {
    alert('Flash Sale is locked to ON by default.');
  };

  const toggleNewArrivals = () => {
    alert('New Arrivals is locked to ON by default.');
  };

  const toggleNewArrivalProduct = (productId) => {
    setNewArrivalIds(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const resetFlashSaleTimer = () => {
    setFlashSaleEndTime(new Date().getTime() + (30 * 24 * 60 * 60 * 1000));
  };

  return (
    <AdminContext.Provider value={{
      isFlashSaleOn, toggleFlashSale,
      isNewArrivalsOn, toggleNewArrivals,
      newArrivalIds, toggleNewArrivalProduct,
      flashSaleEndTime, resetFlashSaleTimer,
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);