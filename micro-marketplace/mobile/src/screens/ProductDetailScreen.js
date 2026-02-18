import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, ScrollView, TouchableOpacity,
  StyleSheet, ActivityIndicator, Alert
} from 'react-native';
import { getProduct, toggleFavorite } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { colors, radius, spacing } from '../utils/theme';

export default function ProductDetailScreen({ route, navigation }) {
  const { productId } = route.params;
  const { user, isFavorited, toggleLocalFavorite } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favLoading, setFavLoading] = useState(false);

  useEffect(() => {
    getProduct(productId)
      .then(res => setProduct(res.data.data.product))
      .catch(() => Alert.alert('Error', 'Product not found'))
      .finally(() => setLoading(false));
  }, [productId]);

  const favorited = product ? isFavorited(product._id) : false;

  const handleFavorite = async () => {
    if (!user) { Alert.alert('Login required', 'Please sign in to save favorites'); return; }
    setFavLoading(true);
    try {
      await toggleFavorite(product._id);
      toggleLocalFavorite(product._id);
    } catch { Alert.alert('Error', 'Something went wrong'); }
    finally { setFavLoading(false); }
  };

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.bg }]}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (!product) return null;

  const stars = Math.round(product.rating || 0);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Back button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      {/* Product Image */}
      <Image source={{ uri: product.image }} style={styles.img} resizeMode="cover" />

      <View style={styles.body}>
        {/* Category + Favorite */}
        <View style={styles.row}>
          <Text style={styles.category}>{product.category}</Text>
          <TouchableOpacity style={[styles.favBtn, favorited && styles.favBtnActive]} onPress={handleFavorite} disabled={favLoading}>
            <Text style={{ fontSize: 20, color: favorited ? colors.accent : colors.subtext }}>
              {favorited ? '♥' : '♡'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={styles.title}>{product.title}</Text>

        {/* Rating */}
        <View style={styles.ratingRow}>
          <Text style={styles.stars}>{'★'.repeat(stars)}{'☆'.repeat(5 - stars)}</Text>
          <Text style={styles.ratingNum}>{product.rating?.toFixed(1)}</Text>
          <Text style={styles.reviewCount}>({product.reviews?.toLocaleString()} reviews)</Text>
        </View>

        {/* Price */}
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>

        {/* Description */}
        <Text style={styles.sectionLabel}>DESCRIPTION</Text>
        <Text style={styles.description}>{product.description}</Text>

        {/* Stock */}
        <Text style={styles.stock}>
          {product.stock > 0 ? `✓ ${product.stock} units available` : '✕ Out of stock'}
        </Text>

        {/* Seller */}
        {product.seller && (
          <View style={styles.sellerWrap}>
            <View style={styles.sellerAvatar}>
              <Text style={styles.sellerInitial}>{product.seller.name?.[0]?.toUpperCase()}</Text>
            </View>
            <View>
              <Text style={styles.sellerLabel}>Sold by</Text>
              <Text style={styles.sellerName}>{product.seller.name}</Text>
            </View>
          </View>
        )}

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.btnPrimary}>
            <Text style={styles.btnPrimaryText}>🛒  Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnOutline, favorited && { borderColor: colors.accent }]}
            onPress={handleFavorite}
            disabled={favLoading}
          >
            <Text style={[styles.btnOutlineText, favorited && { color: colors.accent }]}>
              {favorited ? '♥ Saved' : '♡ Save'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  backBtn: { position: 'absolute', top: 16, left: 16, zIndex: 10, backgroundColor: 'rgba(12,12,14,0.7)', padding: 10, borderRadius: radius.full },
  backText: { color: colors.text, fontSize: 14 },
  img: { width: '100%', height: 320 },
  body: { padding: spacing.lg },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  category: { fontSize: 11, color: colors.accent, textTransform: 'uppercase', letterSpacing: 1, fontWeight: '600' },
  favBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border },
  favBtnActive: { borderColor: colors.accent, backgroundColor: 'rgba(255,107,53,0.1)' },
  title: { fontSize: 28, color: colors.text, fontWeight: '300', lineHeight: 36, marginBottom: 16 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  stars: { color: colors.gold, fontSize: 16 },
  ratingNum: { color: colors.gold, fontWeight: '600', fontSize: 14 },
  reviewCount: { color: colors.subtext, fontSize: 13 },
  price: { fontSize: 36, color: colors.gold, fontWeight: '500', marginBottom: 24 },
  sectionLabel: { fontSize: 10, color: colors.subtext, letterSpacing: 1, textTransform: 'uppercase', fontWeight: '600', marginBottom: 8 },
  description: { color: colors.subtext, fontSize: 15, lineHeight: 24, marginBottom: 20 },
  stock: { color: colors.green, fontSize: 13, marginBottom: 24 },
  sellerWrap: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: spacing.md, backgroundColor: colors.surface, borderRadius: radius.md, marginBottom: 24, borderWidth: 1, borderColor: colors.border },
  sellerAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  sellerInitial: { color: '#fff', fontSize: 18, fontWeight: '600' },
  sellerLabel: { color: colors.subtext, fontSize: 12 },
  sellerName: { color: colors.text, fontSize: 15 },
  actions: { gap: 12, paddingBottom: 40 },
  btnPrimary: { backgroundColor: colors.accent, borderRadius: radius.full, padding: 18, alignItems: 'center' },
  btnPrimaryText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  btnOutline: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.full, padding: 18, alignItems: 'center' },
  btnOutlineText: { color: colors.text, fontSize: 15 },
});
