import FlashSale from '../components/FlashSale';
import ProductCard from '../components/ProductCard';
import { featuredProducts } from '../data/products';
import { useAdmin } from '../context/AdminContext'; // Import hook

export default function DealsPage() {
  const { isFlashSaleOn } = useAdmin(); // Get toggle state
  const discountedProducts = featuredProducts.filter(p => p.oldPrice > p.price);
  
  return (
    <>
      {/* Only render FlashSale if Admin has it ON */}
      {isFlashSaleOn && <FlashSale />}
      
      <div className="container section">
        <h2 className="section-title" style={{ marginBottom: '2rem' }}>More Hot Deals</h2>
        <div className="products-grid">
          {discountedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}