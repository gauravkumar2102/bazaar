import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, ActivityIndicator, Alert, KeyboardAvoidingView, Platform
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { colors, radius, spacing } from '../utils/theme';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      await login(email.trim(), password);
    } catch (err) {
      Alert.alert('Login Failed', err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => {
    setEmail('alice@example.com');
    setPassword('password123');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* Logo */}
        <View style={styles.logoWrap}>
          <Text style={styles.logo}>Baz<Text style={{ color: colors.accent }}>aa</Text>r</Text>
          <Text style={styles.tagline}>Discover remarkable things</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.label}>EMAIL</Text>
          <TextInput
            style={styles.input}
            placeholder="alice@example.com"
            placeholderTextColor={colors.muted}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={[styles.label, { marginTop: spacing.md }]}>PASSWORD</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor={colors.muted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.btnPrimary} onPress={handleLogin} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.btnPrimaryText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnOutline} onPress={fillDemo}>
            <Text style={styles.btnOutlineText}>Use Demo Credentials</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.switchWrap}>
            <Text style={styles.switchText}>
              Don't have an account?{' '}
              <Text style={{ color: colors.accent }}>Sign up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: spacing.lg, justifyContent: 'center' },
  logoWrap: { alignItems: 'center', marginBottom: 48 },
  logo: { fontSize: 52, color: colors.text, fontWeight: '300', letterSpacing: -1 },
  tagline: { color: colors.subtext, fontSize: 14, marginTop: 6 },
  form: { backgroundColor: colors.card, borderRadius: radius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border },
  label: { fontSize: 11, color: colors.subtext, letterSpacing: 1, textTransform: 'uppercase', fontWeight: '600', marginBottom: 6 },
  input: {
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.md, padding: 14, color: colors.text, fontSize: 15
  },
  btnPrimary: {
    backgroundColor: colors.accent, borderRadius: radius.full,
    padding: 16, alignItems: 'center', marginTop: spacing.lg
  },
  btnPrimaryText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  btnOutline: {
    borderWidth: 1, borderColor: colors.border, borderRadius: radius.full,
    padding: 16, alignItems: 'center', marginTop: spacing.sm
  },
  btnOutlineText: { color: colors.subtext, fontSize: 14 },
  switchWrap: { alignItems: 'center', marginTop: spacing.lg },
  switchText: { color: colors.subtext, fontSize: 14 },
});
