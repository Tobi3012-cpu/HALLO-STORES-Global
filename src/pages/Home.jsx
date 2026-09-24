import Hero from '../components/Hero';
import TrustBadges from '../components/TrustBadges';
import CategoriesGrid from '../components/CategoriesGrid';
import ProductCard from '../components/ProductCard';
import FlashSale from '../components/FlashSale';
import { featuredProducts } from '../data/products';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAdmin } from '../context/AdminContext'; // 1. Import useAdmin

export default function Home() {
  const { isFlashSaleOn } = useAdmin(); // 2. Get the toggle state
  
  return (
    <>
      <Hero />
      <TrustBadges />
      
      <section className="container section">
        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
          <Link to="/categories" className="view-all">View All Categories <ArrowRight size={16} /></Link>
        </div>
        <CategoriesGrid showAll={false} />
      </section>

      <section className="container section">
        <div className="section-header">
          <h2 className="section-title">Featured Products</h2>
          <Link to="/categories" className="view-all">View All Products <ArrowRight size={16} /></Link>
        </div>
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. Only render FlashSale if Admin has it ON */}
      {isFlashSaleOn && <FlashSale />}
    </>
  );
}