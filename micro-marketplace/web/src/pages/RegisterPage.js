import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.name || form.name.trim().length < 2) e.name = 'Name must be at least 2 characters';
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password || form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    return e;
  };

  const set = (field) => (e) => {
    setForm(f => ({...f, [field]: e.target.value}));
    setErrors(er => ({...er, [field]: ''}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await register(form.name.trim(), form.email, form.password);
      toast.success('Account created! Welcome to Bazaar 🛍️');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card fade-up">
        <div className="auth-logo">
          <h1>Baz<span style={{color:'var(--accent)'}}>aa</span>r</h1>
          <p>Create your account — it's free</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {[
            { field: 'name',     label: 'Full Name', type: 'text',     placeholder: 'Alice Johnson' },
            { field: 'email',    label: 'Email',     type: 'email',    placeholder: 'alice@example.com' },
            { field: 'password', label: 'Password',  type: 'password', placeholder: '6+ characters' },
            { field: 'confirm',  label: 'Confirm Password', type: 'password', placeholder: 'Repeat password' }
          ].map(({ field, label, type, placeholder }) => (
            <div className="input-group" key={field}>
              <label className="input-label">{label}</label>
              <input className="input" type={type} placeholder={placeholder} value={form[field]} onChange={set(field)} />
              {errors[field] && <span className="input-error">{errors[field]}</span>}
            </div>
          ))}

          <button className="btn btn-primary" type="submit" disabled={loading} style={{width:'100%'}}>
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <div className="auth-switch" style={{marginTop: 24}}>
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
