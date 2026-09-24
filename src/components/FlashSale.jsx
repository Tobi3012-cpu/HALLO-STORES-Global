import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

export default function FlashSale() {
  const { flashSaleEndTime } = useAdmin();
  const [timeLeft, setTimeLeft] = useState(flashSaleEndTime - new Date().getTime());

  useEffect(() => {
    // Update the timer every second
    const timer = setInterval(() => {
      const remaining = flashSaleEndTime - new Date().getTime();
      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(timer);
  }, [flashSaleEndTime]);

  // Format the time
  const days = Math.max(0, Math.floor(timeLeft / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((timeLeft / (1000 * 60 * 60)) % 24));
  const mins = Math.max(0, Math.floor((timeLeft / 1000 / 60) % 60));
  const secs = Math.max(0, Math.floor((timeLeft / 1000) % 60));

  // If the timer hits 0, show "Sale Ended"
  if (timeLeft <= 0) {
    return (
      <section className="flash-sale">
        <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
          <h2 className="flash-title">Sale Has Ended!</h2>
          <p className="flash-desc">Stay tuned for our next big promotion.</p>
          <Link to="/" className="btn-white" style={{ display: 'inline-block', marginTop: '1rem' }}>Back to Home</Link>
        </div>
      </section>
    );
  }

  // Otherwise, show the active sale
  return (
    <section className="flash-sale">
      <div className="container flash-sale-content">
        <div className="flash-text">
          <span className="flash-tag">⚡ Flash Sale</span>
          <h2 className="flash-title">Up to 70% OFF</h2>
          <p className="flash-desc">Limited time offer on selected accessories.</p>
          
          <div className="countdown">
            <div className="countdown-box">
              <span>{days.toString().padStart(2, '0')}</span>
              <span>Days</span>
            </div>
            <div className="countdown-box">
              <span>{hours.toString().padStart(2, '0')}</span>
              <span>Hours</span>
            </div>
            <div className="countdown-box">
              <span>{mins.toString().padStart(2, '0')}</span>
              <span>Mins</span>
            </div>
            <div className="countdown-box">
              <span>{secs.toString().padStart(2, '0')}</span>
              <span>Secs</span>
            </div>
          </div>
          
          <Link to="/deals" className="btn-white">Shop Now →</Link>
        </div>
        <div className="flash-image-container">
          <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600" alt="Flash Sale Headphones" />
          <div className="discount-badge">
            <span>UP TO</span><span>70%</span><span>OFF</span>
          </div>
        </div>
      </div>
    </section>
  );
}