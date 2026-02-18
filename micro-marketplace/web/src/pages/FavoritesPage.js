import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyFavorites } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';

export default function FavoritesPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    getMyFavorites()
      .then(res => setFavorites(res.data.data.favorites))
      .catch(() => toast.error('Failed to load favorites'))
      .finally(() => setLoading(false));
  }, [user, navigate]);

  if (loading) return <div className="spinner"><div className="spinner-ring"/></div>;

  return (
    <div className="container" style={{paddingTop: 40, paddingBottom: 80}}>
      <div style={{marginBottom: 32}}>
        <h1 style={{fontFamily:'var(--font-display)', fontSize: 'clamp(28px,4vw,44px)', marginBottom: 8}}>
          Your Saved Items
        </h1>
        <p style={{color:'var(--subtext)'}}>{favorites.length} item{favorites.length !== 1 ? 's' : ''} saved</p>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <p style={{fontSize: 48, marginBottom: 16}}>♡</p>
          <h3>Nothing saved yet</h3>
          <p style={{marginBottom: 24}}>Browse the shop and tap the heart icon to save products here.</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>Browse Products</button>
        </div>
      ) : (
        <div className="products-grid">
          {favorites.map((p, i) => <ProductCard key={p._id} product={p} delay={i * 60} />)}
        </div>
      )}
    </div>
  );
}
