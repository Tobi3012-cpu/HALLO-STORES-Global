import ProductCard from '../components/ProductCard';
import { featuredProducts } from '../data/products';
import { useAdmin } from '../context/AdminContext';

export default function NewArrivalsPage() {
  const { newArrivalIds, isNewArrivalsOn } = useAdmin();
  
  // Filter products to only show the ones selected in Admin
  const newArrivals = featuredProducts.filter(p => newArrivalIds.includes(p.id));
  
  if (!isNewArrivalsOn) {
    return (
      <div className="container section" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h2 className="section-title">New Arrivals is currently disabled.</h2>
      </div>
    );
  }
  
  return (
    <div className="container section">
      <h1 className="section-title" style={{ marginBottom: '2rem' }}>New Arrivals</h1>
      {newArrivals.length === 0 ? (
        <p>No products selected for New Arrivals yet. Go to the Admin panel to select products.</p>
      ) : (
        <div className="products-grid">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}