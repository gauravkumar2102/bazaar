import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back! 🎉');
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => setForm({ email: 'alice@example.com', password: 'password123' });

  return (
    <div className="auth-page">
      <div className="auth-card fade-up">
        <div className="auth-logo">
          <h1>Baz<span style={{color:'var(--accent)'}}>aa</span>r</h1>
          <p>Sign in to your account</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              className="input"
              type="email"
              placeholder="alice@example.com"
              value={form.email}
              onChange={e => { setForm(f => ({...f, email: e.target.value})); setErrors(er => ({...er, email: ''})); }}
            />
            {errors.email && <span className="input-error">{errors.email}</span>}
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              className="input"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={e => { setForm(f => ({...f, password: e.target.value})); setErrors(er => ({...er, password: ''})); }}
            />
            {errors.password && <span className="input-error">{errors.password}</span>}
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading} style={{width:'100%'}}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>

          <div className="auth-divider">or</div>

          <button type="button" className="btn btn-outline" onClick={fillDemo} style={{width:'100%', fontSize:13}}>
            Use demo credentials
          </button>
        </form>

        <div className="auth-switch" style={{marginTop: 24}}>
          Don't have an account? <Link to="/register">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
