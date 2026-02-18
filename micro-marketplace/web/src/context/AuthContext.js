import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { login as apiLogin, register as apiRegister, getMe } from '../utils/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  // Fetch fresh user data on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getMe()
        .then(res => {
          const u = res.data.data.user;
          setUser(u);
          setFavorites(u.favorites?.map(f => (typeof f === 'object' ? f._id : f)) || []);
          localStorage.setItem('user', JSON.stringify(u));
        })
        .catch(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await apiLogin({ email, password });
    const { user: u, token } = res.data.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(u));
    setUser(u);
    setFavorites(u.favorites?.map(f => (typeof f === 'object' ? f._id : f)) || []);
    return u;
  };

  const register = async (name, email, password) => {
    const res = await apiRegister({ name, email, password });
    const { user: u, token } = res.data.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(u));
    setUser(u);
    setFavorites([]);
    return u;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setFavorites([]);
  };

  const toggleLocalFavorite = useCallback((productId) => {
    setFavorites(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  }, []);

  const isFavorited = useCallback((productId) => favorites.includes(productId), [favorites]);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, favorites, isFavorited, toggleLocalFavorite }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
