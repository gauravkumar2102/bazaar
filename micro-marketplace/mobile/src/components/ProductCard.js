import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { toggleFavorite } from '../utils/api';
import { colors, radius, spacing } from '../utils/theme';

export default function ProductCard({ product, onPress }) {
  const { user, isFavorited, toggleLocalFavorite } = useAuth();
  const [favLoading, setFavLoading] = useState(false);
  const favorited = isFavorited(product._id);

  const handleFavorite = async () => {
    if (!user) { Alert.alert('Login required', 'Please sign in to save favorites'); return; }
    setFavLoading(true);
    try {
      await toggleFavorite(product._id);
      toggleLocalFavorite(product._id);
    } catch { Alert.alert('Error', 'Something went wrong'); }
    finally { setFavLoading(false); }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.imgWrap}>
        <Image
          style={styles.img}
          source={{ uri: product.image }}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={[styles.favBtn, favorited && styles.favBtnActive]}
          onPress={handleFavorite}
          disabled={favLoading}
        >
          <Text style={{ fontSize: 16, color: favorited ? colors.accent : colors.subtext }}>
            {favorited ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <View style={styles.ratingWrap}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.rating}>{product.rating?.toFixed(1)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card, borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.border,
    overflow: 'hidden', flex: 1, margin: 6
  },
  imgWrap: { position: 'relative' },
  img: { width: '100%', height: 160 },
  favBtn: {
    position: 'absolute', top: 8, right: 8,
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: 'rgba(20,20,24,0.85)',
    alignItems: 'center', justifyContent: 'center'
  },
  favBtnActive: { backgroundColor: 'rgba(255,107,53,0.15)' },
  body: { padding: spacing.sm + 4 },
  category: { fontSize: 10, color: colors.accent, textTransform: 'uppercase', letterSpacing: 1, fontWeight: '600', marginBottom: 4 },
  title: { fontSize: 13, color: colors.text, fontWeight: '400', marginBottom: 8, lineHeight: 18 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  price: { fontSize: 15, color: colors.gold, fontWeight: '500' },
  ratingWrap: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  star: { color: colors.gold, fontSize: 12 },
  rating: { fontSize: 12, color: colors.subtext },
});
