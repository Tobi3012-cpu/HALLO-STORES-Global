import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-content">
        <div className="hero-text">
          <span className="hero-tag">New Collection 2026</span>
          <h1 className="hero-title">
            Elevate Your <br />
            <span>Tech Experience</span>
          </h1>
          <p className="hero-desc">
            Premium drones and handheld games designed for enthusiasts, explorers, and gamers.
          </p>
          <div className="hero-buttons">
            <Link to="/categories" className="btn-primary">
              Shop Collection <ArrowRight size={18} />
            </Link>
            <Link to="/deals" className="btn-outline">
              Explore Deals
            </Link>
          </div>
        </div>

        <div className="hero-image-container">
          <div className="hero-image-glow" />
          <img
       src="/hero-drone.png"
     alt="Featured drone"
     className="hero-image"
/>
          <div className="discount-badge">
            <span>UP TO</span>
            <span>50%</span>
            <span>OFF</span>
          </div>
        </div>
      </div>
    </section>
  );
}