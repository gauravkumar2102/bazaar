import React, { useState, useEffect, useCallback } from 'react';
import { getProducts } from '../utils/api';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Home', 'Books', 'Sports', 'Beauty', 'Toys', 'Food', 'Other'];
const SORT_OPTIONS = [
  { label: 'Newest',       value: 'newest' },
  { label: 'Price: Low',   value: 'price_asc' },
  { label: 'Price: High',  value: 'price_desc' },
  { label: 'Top Rated',    value: 'rating' }
];

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => { setPage(1); }, [debouncedSearch, category, sort]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 8, sort };
      if (debouncedSearch) params.q = debouncedSearch;
      if (category !== 'All') params.category = category;
      const res = await getProducts(params);
      setProducts(res.data.data.products);
      setPagination(res.data.data.pagination);
    } catch {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, category, sort]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const renderPagination = () => {
    if (pagination.totalPages <= 1) return null;
    const pages = [];
    for (let i = 1; i <= pagination.totalPages; i++) {
      if (i === 1 || i === pagination.totalPages || Math.abs(i - page) <= 2) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '…') {
        pages.push('…');
      }
    }
    return (
      <div className="pagination">
        <button className="page-btn" onClick={() => setPage(p => p - 1)} disabled={page === 1}>‹</button>
        {pages.map((p, i) =>
          p === '…' ? (
            <span key={`ellipsis-${i}`} style={{color: 'var(--muted)', padding: '0 4px'}}>…</span>
          ) : (
            <button key={p} className={`page-btn${page === p ? ' active' : ''}`} onClick={() => setPage(p)}>{p}</button>
          )
        )}
        <button className="page-btn" onClick={() => setPage(p => p + 1)} disabled={page === pagination.totalPages}>›</button>
      </div>
    );
  };

  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <h1 className="fade-up">Discover <em>remarkable</em><br />things</h1>
        <p className="fade-up fade-up-delay-1">A curated marketplace of products you'll love.</p>
        <div className="search-wrap fade-up fade-up-delay-2" style={{margin: '0 auto'}}>
          <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            className="input search-input"
            placeholder="Search products, categories…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </section>

      <div className="container">
        {/* Filters */}
        <div className="filters-bar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`filter-chip${category === cat ? ' active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
          <div className="filters-right">
            <select className="filter-select" value={sort} onChange={e => setSort(e.target.value)}>
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* Results count */}
        {!loading && (
          <p style={{color: 'var(--subtext)', fontSize: 13, marginBottom: 20}}>
            {pagination.total} product{pagination.total !== 1 ? 's' : ''}
            {debouncedSearch ? ` for "${debouncedSearch}"` : ''}
            {category !== 'All' ? ` in ${category}` : ''}
          </p>
        )}

        {/* Grid */}
        {loading ? (
          <div className="spinner"><div className="spinner-ring"/></div>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <h3>No products found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((p, i) => <ProductCard key={p._id} product={p} delay={i * 60} />)}
          </div>
        )}

        {renderPagination()}

        <div style={{height: 80}} />
      </div>
    </div>
  );
}
