import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  // 🔒 Locked OFF — features are always disabled
  const [isFlashSaleOn] = useState(false);
  const [isNewArrivalsOn] = useState(false);

  const [newArrivalIds, setNewArrivalIds] = useState(() => {
    const saved = localStorage.getItem('newArrivalIds');
    return saved ? JSON.parse(saved) : [5, 6, 7];
  });

  const [flashSaleEndTime, setFlashSaleEndTime] = useState(() => {
    const saved = localStorage.getItem('flashSaleEndTime');
    if (saved) return parseInt(saved, 10);
    return new Date().getTime() + (30 * 24 * 60 * 60 * 1000);
  });

  useEffect(() => {
    localStorage.setItem('newArrivalIds', JSON.stringify(newArrivalIds));
    localStorage.setItem('flashSaleEndTime', flashSaleEndTime.toString());
  }, [newArrivalIds, flashSaleEndTime]);

  // No-op toggles (kept so admin buttons don't crash)
  const toggleFlashSale = () => {
    alert('Flash Sale is locked OFF.');
  };

  const toggleNewArrivals = () => {
    alert('New Arrivals is locked OFF.');
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