import { useParams, Link } from 'react-router-dom';
import { categories, featuredProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import { ArrowLeft } from 'lucide-react';

export default function CategoryDetailPage() {
  // Get the categoryId from the URL (e.g., /category/1)
  const { categoryId } = useParams();
  
  // Find the category name for the title
  const category = categories.find(c => c.id === parseInt(categoryId));
  
  // Filter products based on the categoryId
  const filteredProducts = featuredProducts.filter(
    p => p.categoryId === parseInt(categoryId)
  );

  // If someone types a bad URL, show an error message
  if (!category) {
    return (
      <div className="container section" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h2 className="section-title">Category not found!</h2>
        <Link to="/categories" className="btn-primary" style={{ display: 'inline-flex', marginTop: '1rem' }}>
          Back to Categories
        </Link>
      </div>
    );
  }

  return (
    <div className="container section">
      <Link to="/categories" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '1.5rem', fontWeight: '500' }}>
        <ArrowLeft size={16} /> Back to Categories
      </Link>
      
      <h1 className="section-title" style={{ marginBottom: '2rem' }}>
        {category.name} ({filteredProducts.length} Products)
      </h1>
      
      {filteredProducts.length === 0 ? (
        <p>No products found in this category yet.</p>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}