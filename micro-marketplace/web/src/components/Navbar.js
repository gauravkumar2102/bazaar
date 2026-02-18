import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          Baz<span>aa</span>r
        </Link>

        <div className="navbar-actions">
          {user ? (
            <>
              <Link to="/" className={`navbar-link${pathname === '/' ? ' active' : ''}`}>
                Shop
              </Link>
              <Link to="/favorites" className={`navbar-link${pathname === '/favorites' ? ' active' : ''}`}>
                ♡ Saved
              </Link>
              <span style={{ color: 'var(--subtext)', fontSize: 14 }}>Hi, {user.name.split(' ')[0]}</span>
              <button className="btn btn-outline btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
