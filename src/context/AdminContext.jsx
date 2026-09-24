import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isFlashSaleOn, setIsFlashSaleOn] = useState(() => {
    const saved = localStorage.getItem('isFlashSaleOn');
    return saved ? JSON.parse(saved) : true;
  });

  const [isNewArrivalsOn, setIsNewArrivalsOn] = useState(() => {
    const saved = localStorage.getItem('isNewArrivalsOn');
    return saved ? JSON.parse(saved) : true;
  });

  const [newArrivalIds, setNewArrivalIds] = useState(() => {
    const saved = localStorage.getItem('newArrivalIds');
    return saved ? JSON.parse(saved) : [1, 2];
  });

  // NEW: Flash Sale End Time (Default is 3 days from now)
  const [flashSaleEndTime, setFlashSaleEndTime] = useState(() => {
    const saved = localStorage.getItem('flashSaleEndTime');
    if (saved) return parseInt(saved, 10);
    return new Date().getTime() + (3 * 24 * 60 * 60 * 1000); 
  });

  useEffect(() => {
    localStorage.setItem('isFlashSaleOn', JSON.stringify(isFlashSaleOn));
    localStorage.setItem('isNewArrivalsOn', JSON.stringify(isNewArrivalsOn));
    localStorage.setItem('newArrivalIds', JSON.stringify(newArrivalIds));
    localStorage.setItem('flashSaleEndTime', flashSaleEndTime.toString());
  }, [isFlashSaleOn, isNewArrivalsOn, newArrivalIds, flashSaleEndTime]);

  const toggleFlashSale = () => setIsFlashSaleOn(prev => !prev);
  const toggleNewArrivals = () => setIsNewArrivalsOn(prev => !prev);
  
  const toggleNewArrivalProduct = (productId) => {
    setNewArrivalIds(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  // NEW: Function to reset the timer (e.g., start a new sale)
  const resetFlashSaleTimer = () => {
    setFlashSaleEndTime(new Date().getTime() + (3 * 24 * 60 * 60 * 1000));
    setIsFlashSaleOn(true);
  };

  return (
    <AdminContext.Provider value={{
      isFlashSaleOn, toggleFlashSale,
      isNewArrivalsOn, toggleNewArrivals,
      newArrivalIds, toggleNewArrivalProduct,
      flashSaleEndTime, resetFlashSaleTimer
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);