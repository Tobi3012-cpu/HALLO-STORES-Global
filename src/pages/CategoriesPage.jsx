import CategoriesGrid from '../components/CategoriesGrid';
import ProductCard from '../components/ProductCard';
import { featuredProducts } from '../data/products';

export default function CategoriesPage() {
  return (
    <div className="container section">
      <h1 className="section-title" style={{ marginBottom: '2rem' }}>All Categories</h1>
      <CategoriesGrid showAll={true} />
      
      <h2 className="section-title" style={{ marginTop: '4rem', marginBottom: '2rem' }}>Browse All Products</h2>
      <div className="products-grid">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}