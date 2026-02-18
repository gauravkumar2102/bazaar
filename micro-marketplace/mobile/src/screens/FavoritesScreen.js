import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, FlatList, StyleSheet,
  ActivityIndicator, TouchableOpacity
} from 'react-native';
import { getMyFavorites } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import { colors, spacing } from '../utils/theme';

export default function FavoritesScreen({ navigation }) {
  const { user, favorites } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = useCallback(async () => {
    if (!user) { setLoading(false); return; }
    setLoading(true);
    try {
      const res = await getMyFavorites();
      setItems(res.data.data.favorites);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, [user, favorites]);

  useEffect(() => { fetchFavorites(); }, [fetchFavorites]);

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text style={{ fontSize: 40, marginBottom: 16 }}>♡</Text>
        <Text style={styles.emptyTitle}>Sign in to view favorites</Text>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Auth', { screen: 'Login' })}>
          <Text style={styles.btnText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (loading) {
    return <View style={styles.centered}><ActivityIndicator size="large" color={colors.accent} /></View>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved Items</Text>
        <Text style={styles.headerSub}>{items.length} item{items.length !== 1 ? 's' : ''}</Text>
      </View>

      {items.length === 0 ? (
        <View style={styles.centered}>
          <Text style={{ fontSize: 40, marginBottom: 16 }}>♡</Text>
          <Text style={styles.emptyTitle}>Nothing saved yet</Text>
          <Text style={styles.emptyText}>Tap the heart on any product to save it here.</Text>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Shop')}>
            <Text style={styles.btnText}>Browse Products</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <View style={{ width: '50%' }}>
              <ProductCard
                product={item}
                onPress={() => navigation.navigate('ProductDetail', { productId: item._id })}
              />
            </View>
          )}
          keyExtractor={item => item._id}
          numColumns={2}
          contentContainerStyle={{ padding: spacing.sm }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { padding: spacing.md, paddingTop: spacing.md + 8 },
  headerTitle: { fontSize: 30, color: colors.text, fontWeight: '300' },
  headerSub: { color: colors.subtext, fontSize: 14, marginTop: 4 },
  centered: { flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  emptyTitle: { fontSize: 20, color: colors.text, fontWeight: '400', marginBottom: 8 },
  emptyText: { color: colors.subtext, fontSize: 14, textAlign: 'center', marginBottom: 24 },
  btn: { backgroundColor: colors.accent, borderRadius: 50, paddingHorizontal: 32, paddingVertical: 14 },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 15 },
});
