import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-content">
        <div className="hero-text">
          <span className="hero-tag">New Collection 2024</span>
          <h1 className="hero-title">Elevate Your <br /> <span>Tech Experience</span></h1>
          <p className="hero-desc">Premium drones and handheld games designed for enthusiasts, explorers, and gamers.</p>
          <div className="hero-buttons">
            {/* Buttons now use Link to navigate */}
            <Link to="/categories" className="btn-primary">Shop Collection <ArrowRight size={18} /></Link>
            <Link to="/deals" className="btn-outline">Explore Deals</Link>
          </div>
          <div className="hero-reviews">
            <div className="avatars">
              {[1, 2, 3, 4].map((i) => (
                <img key={i} src={`https://i.pravatar.cc/100?img=${i}`} alt="User" />
              ))}
            </div>
            <div className="review-text">
              <strong>25K+ Happy Customers</strong>
              <p className="review-stars">★★★★★ 4.9/5 (2.5K Reviews)</p>
            </div>
          </div>
        </div>
        <div className="hero-image-container">
          <img src="https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&q=80&w=800" alt="Hero Drone" className="hero-image" />
          {/* <div className="discount-badge">
            <span>UP TO</span><span>50%</span><span>OFF</span>
          </div> */}
        </div>
      </div>
    </section>
  );
}