import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, TextInput, FlatList, TouchableOpacity,
  StyleSheet, ActivityIndicator, RefreshControl, ScrollView
} from 'react-native';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../utils/api';
import { colors, radius, spacing } from '../utils/theme';

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Home', 'Books', 'Sports', 'Beauty', 'Toys', 'Food'];

export default function ProductsScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => { setDebouncedSearch(search); setPage(1); }, 400);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => { setPage(1); }, [category]);

  const fetchProducts = useCallback(async (refresh = false) => {
    if (refresh) setRefreshing(true);
    else setLoading(true);
    try {
      const params = { page: refresh ? 1 : page, limit: 10 };
      if (debouncedSearch) params.q = debouncedSearch;
      if (category !== 'All') params.category = category;
      const res = await getProducts(params);
      const { products: prods, pagination: pag } = res.data.data;
      setProducts(prods);
      setPagination(pag);
    } catch (err) { console.error(err); }
    finally { setLoading(false); setRefreshing(false); }
  }, [page, debouncedSearch, category]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const renderItem = ({ item, index }) => (
    <View style={{ width: '50%' }}>
      <ProductCard product={item} onPress={() => navigation.navigate('ProductDetail', { productId: item._id })} />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Baz<Text style={{ color: colors.accent }}>aa</Text>r</Text>
        <View style={styles.searchWrap}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search products…"
            placeholderTextColor={colors.muted}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Text style={{ color: colors.subtext, paddingHorizontal: 8 }}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Pills */}
      <ScrollView
        horizontal showsHorizontalScrollIndicator={false}
        style={styles.categoriesScroll}
        contentContainerStyle={{ paddingHorizontal: spacing.md, gap: 8 }}
      >
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.chip, category === cat && styles.chipActive]}
            onPress={() => setCategory(cat)}
          >
            <Text style={[styles.chipText, category === cat && styles.chipTextActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Count */}
      {!loading && (
        <Text style={styles.resultCount}>
          {pagination.total} product{pagination.total !== 1 ? 's' : ''}
          {debouncedSearch ? ` for "${debouncedSearch}"` : ''}
        </Text>
      )}

      {/* Grid */}
      {loading ? (
        <View style={styles.centered}><ActivityIndicator size="large" color={colors.accent} /></View>
      ) : products.length === 0 ? (
        <View style={styles.centered}>
          <Text style={{ fontSize: 40, marginBottom: 12 }}>🔍</Text>
          <Text style={{ color: colors.subtext, fontSize: 16 }}>No products found</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          numColumns={2}
          contentContainerStyle={{ padding: spacing.sm }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => fetchProducts(true)} tintColor={colors.accent} />}
          ListFooterComponent={() => (
            <View style={styles.pagination}>
              <TouchableOpacity
                style={[styles.pageBtn, page === 1 && styles.pageBtnDisabled]}
                onPress={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <Text style={styles.pageBtnText}>‹ Prev</Text>
              </TouchableOpacity>
              <Text style={styles.pageInfo}>{page} / {pagination.totalPages}</Text>
              <TouchableOpacity
                style={[styles.pageBtn, page >= pagination.totalPages && styles.pageBtnDisabled]}
                onPress={() => setPage(p => p + 1)}
                disabled={page >= pagination.totalPages}
              >
                <Text style={styles.pageBtnText}>Next ›</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { padding: spacing.md, paddingTop: spacing.md + 8 },
  headerTitle: { fontSize: 30, color: colors.text, fontWeight: '300', marginBottom: 12 },
  searchWrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.surface, borderRadius: radius.full,
    borderWidth: 1, borderColor: colors.border, paddingHorizontal: 14
  },
  searchIcon: { fontSize: 14, marginRight: 6 },
  searchInput: { flex: 1, paddingVertical: 12, color: colors.text, fontSize: 14 },
  categoriesScroll: { maxHeight: 52, marginBottom: 4 },
  chip: {
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: radius.full, borderWidth: 1, borderColor: colors.border,
    backgroundColor: colors.card
  },
  chipActive: { borderColor: colors.accent, backgroundColor: 'rgba(255,107,53,0.08)' },
  chipText: { fontSize: 13, color: colors.subtext },
  chipTextActive: { color: colors.accent },
  resultCount: { fontSize: 12, color: colors.muted, paddingHorizontal: spacing.md, paddingBottom: 4 },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  pagination: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 16, padding: spacing.lg },
  pageBtn: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: radius.full, borderWidth: 1, borderColor: colors.border },
  pageBtnDisabled: { opacity: 0.3 },
  pageBtnText: { color: colors.text, fontSize: 14 },
  pageInfo: { color: colors.subtext, fontSize: 14 },
});
