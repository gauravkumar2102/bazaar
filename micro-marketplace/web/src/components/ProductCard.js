import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toggleFavorite } from '../utils/api';
import toast from 'react-hot-toast';

export default function ProductCard({ product, delay = 0 }) {
  const navigate = useNavigate();
  const { user, isFavorited, toggleLocalFavorite } = useAuth();
  const [loading, setLoading] = useState(false);

  const favorited = isFavorited(product._id);

  const handleFavorite = async (e) => {
    e.stopPropagation();
    if (!user) {
      toast.error('Please login to save favorites');
      navigate('/login');
      return;
    }
    setLoading(true);
    try {
      const res = await toggleFavorite(product._id);
      toggleLocalFavorite(product._id);
      toast.success(res.data.data.favorited ? '❤️ Added to favorites' : 'Removed from favorites');
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const stars = () => {
    const full = Math.floor(product.rating);
    const half = product.rating % 1 >= 0.5;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - (half ? 1 : 0));
  };

  return (
    <div
      className={`card product-card fade-up`}
      style={{ animationDelay: `${delay}ms`, opacity: 0 }}
      onClick={() => navigate(`/products/${product._id}`)}
    >
      <div className="product-card-img-wrap">
        <img
          className="product-card-img"
          src={product.image}
          alt={product.title}
          loading="lazy"
          onError={e => { e.target.src = `https://placehold.co/600x400/1a1a20/4a4a5a?text=${encodeURIComponent(product.title)}`; }}
        />
      </div>
      <div className="product-card-body">
        <p className="product-card-category">{product.category}</p>
        <h3 className="product-card-title">{product.title}</h3>
        <div className="product-card-footer">
          <div>
            <p className="product-card-price">${product.price.toFixed(2)}</p>
            <div className="product-card-rating">
              <span className="rating-star">{stars()}</span>
              <span>({product.reviews?.toLocaleString() || 0})</span>
            </div>
          </div>
          <button
            className={`fav-btn${favorited ? ' active' : ''}`}
            onClick={handleFavorite}
            disabled={loading}
            aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg className="heart" width="18" height="18" viewBox="0 0 24 24"
              fill={favorited ? 'currentColor' : 'none'}
              stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
