import { Link } from 'react-router-dom';
import { categories, featuredProducts } from '../data/products';

export default function CategoriesGrid({ showAll = false }) {
  const displayCategories = showAll ? categories : categories.slice(0, 3);

  return (
    <div className="categories-grid">
      {displayCategories.map((cat) => {
        // Automatically count how many products have this categoryId
        const itemCount = featuredProducts.filter(p => p.categoryId === cat.id).length;

        return (
          <Link to={`/category/${cat.id}`} key={cat.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="category-card">
              <img src={cat.image} alt={cat.name} />
              <h3>{cat.name}</h3>
              {/* Display the dynamic count */}
              <p>{itemCount} Items</p>
            </div>
          </Link>
        );
      })}
      
      {!showAll && (
        <Link to="/categories" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="category-card">
            <div style={{ width: '96px', height: '96px', margin: '0 auto 1rem', borderRadius: '50%', backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', fontSize: '2rem' }}>+</div>
            <h3>Accessories</h3>
            <p>Explore more</p>
          </div>
        </Link>
      )}
    </div>
  );
}