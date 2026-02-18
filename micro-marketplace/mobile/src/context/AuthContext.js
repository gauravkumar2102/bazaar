import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as apiLogin, register as apiRegister, getMe } from '../utils/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const res = await getMe();
          const u = res.data.data.user;
          setUser(u);
          setFavorites(u.favorites?.map(f => (typeof f === 'object' ? f._id : f)) || []);
        }
      } catch {
        await AsyncStorage.multiRemove(['token', 'user']);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const login = async (email, password) => {
    const res = await apiLogin({ email, password });
    const { user: u, token } = res.data.data;
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('user', JSON.stringify(u));
    setUser(u);
    setFavorites(u.favorites?.map(f => (typeof f === 'object' ? f._id : f)) || []);
    return u;
  };

  const register = async (name, email, password) => {
    const res = await apiRegister({ name, email, password });
    const { user: u, token } = res.data.data;
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('user', JSON.stringify(u));
    setUser(u);
    setFavorites([]);
    return u;
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(['token', 'user']);
    setUser(null);
    setFavorites([]);
  };

  const toggleLocalFavorite = useCallback((id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  }, []);

  const isFavorited = useCallback((id) => favorites.includes(id), [favorites]);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, favorites, isFavorited, toggleLocalFavorite }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
