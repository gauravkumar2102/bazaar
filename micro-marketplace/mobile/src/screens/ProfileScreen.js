import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { colors, radius, spacing } from '../utils/theme';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Log out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log out', style: 'destructive', onPress: logout }
    ]);
  };

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text style={{ fontSize: 40, marginBottom: 16 }}>👤</Text>
        <Text style={styles.title}>Sign in to your account</Text>
        <TouchableOpacity style={styles.btnPrimary} onPress={() => navigation.navigate('Auth', { screen: 'Login' })}>
          <Text style={styles.btnPrimaryText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOutline} onPress={() => navigation.navigate('Auth', { screen: 'Register' })}>
          <Text style={styles.btnOutlineText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user.name?.[0]?.toUpperCase()}</Text>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.section}>
        {[
          { label: 'Member since', value: new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) },
          { label: 'Saved items', value: `${user.favorites?.length || 0} products` },
        ].map(({ label, value }) => (
          <View key={label} style={styles.row}>
            <Text style={styles.rowLabel}>{label}</Text>
            <Text style={styles.rowValue}>{value}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: spacing.lg },
  centered: { flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center', padding: spacing.lg, gap: 12 },
  title: { fontSize: 22, color: colors.text, fontWeight: '300', marginBottom: 16 },
  header: { alignItems: 'center', marginTop: 32, marginBottom: 40 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  avatarText: { fontSize: 36, color: '#fff', fontWeight: '400' },
  name: { fontSize: 26, color: colors.text, fontWeight: '300' },
  email: { fontSize: 14, color: colors.subtext, marginTop: 4 },
  section: { backgroundColor: colors.card, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  rowLabel: { color: colors.subtext, fontSize: 14 },
  rowValue: { color: colors.text, fontSize: 14, fontWeight: '500' },
  logoutBtn: { marginTop: 40, borderWidth: 1, borderColor: colors.error, borderRadius: radius.full, padding: 16, alignItems: 'center' },
  logoutText: { color: colors.error, fontSize: 15, fontWeight: '500' },
  btnPrimary: { backgroundColor: colors.accent, borderRadius: 50, paddingHorizontal: 40, paddingVertical: 14, width: '100%', alignItems: 'center' },
  btnPrimaryText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  btnOutline: { borderWidth: 1, borderColor: colors.border, borderRadius: 50, paddingHorizontal: 40, paddingVertical: 14, width: '100%', alignItems: 'center' },
  btnOutlineText: { color: colors.text, fontSize: 15 },
});
