import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProduct, toggleFavorite } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isFavorited, toggleLocalFavorite } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favLoading, setFavLoading] = useState(false);

  useEffect(() => {
    getProduct(id)
      .then(res => setProduct(res.data.data.product))
      .catch(() => toast.error('Product not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const favorited = product ? isFavorited(product._id) : false;

  const handleFavorite = async () => {
    if (!user) { navigate('/login'); return; }
    setFavLoading(true);
    try {
      const res = await toggleFavorite(product._id);
      toggleLocalFavorite(product._id);
      toast.success(res.data.data.favorited ? '❤️ Saved to favorites' : 'Removed from favorites');
    } catch { toast.error('Something went wrong'); }
    finally { setFavLoading(false); }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < Math.round(rating) ? 'var(--gold)' : 'var(--border)', fontSize: 20 }}>★</span>
    ));
  };

  if (loading) return <div className="spinner"><div className="spinner-ring"/></div>;
  if (!product) return (
    <div className="container">
      <div className="empty-state">
        <h3>Product not found</h3>
        <p><Link to="/" style={{color:'var(--accent)'}}>← Back to shop</Link></p>
      </div>
    </div>
  );

  return (
    <div className="container">
      <div className="detail-page">
        <Link to="/" className="detail-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
          Back to shop
        </Link>

        <div className="detail-grid fade-up">
          {/* Image */}
          <div className="detail-img-wrap">
            <img
              className="detail-img"
              src={product.image}
              alt={product.title}
              onError={e => { e.target.src = `https://placehold.co/600x600/1a1a20/4a4a5a?text=${encodeURIComponent(product.title)}`; }}
            />
          </div>

          {/* Info */}
          <div>
            <p className="detail-category">{product.category}</p>
            <h1 className="detail-title">{product.title}</h1>

            <div className="detail-rating">
              <div className="detail-stars">{renderStars(product.rating)}</div>
              <span style={{color:'var(--gold)', fontWeight:500}}>{product.rating.toFixed(1)}</span>
              <span className="detail-review-count">({product.reviews?.toLocaleString()} reviews)</span>
            </div>

            <p className="detail-price">${product.price.toFixed(2)}</p>
            <p className="detail-desc">{product.description}</p>
            <p className="detail-stock">
              {product.stock > 0 ? `✓ ${product.stock} in stock` : '✕ Out of stock'}
            </p>

            <div className="detail-actions">
              <button className="btn btn-primary" style={{flex:1}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                Add to Cart
              </button>
              <button
                className={`btn btn-outline${favorited ? '' : ''}`}
                onClick={handleFavorite}
                disabled={favLoading}
                style={{ gap: 8 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24"
                  fill={favorited ? 'var(--accent)' : 'none'}
                  stroke={favorited ? 'var(--accent)' : 'currentColor'}
                  strokeWidth="2"
                  style={{transition:'all 0.3s cubic-bezier(0.34,1.56,0.64,1)'}}>
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                {favorited ? 'Saved' : 'Save'}
              </button>
            </div>

            {/* Seller info */}
            {product.seller && (
              <div className="detail-seller">
                <div className="seller-avatar">
                  {product.seller.name?.[0]?.toUpperCase() || 'S'}
                </div>
                <div className="seller-info">
                  <p>Sold by</p>
                  <p>{product.seller.name}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
