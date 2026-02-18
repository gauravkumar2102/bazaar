import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, ActivityIndicator, Alert, KeyboardAvoidingView, Platform
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { colors, radius, spacing } from '../utils/theme';

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const set = (field) => (val) => setForm(f => ({ ...f, [field]: val }));

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (form.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    if (form.password !== form.confirm) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await register(form.name.trim(), form.email.trim(), form.password);
    } catch (err) {
      Alert.alert('Registration Failed', err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { field: 'name',     label: 'Full Name', placeholder: 'Alice Johnson',     secure: false, keyboard: 'default' },
    { field: 'email',    label: 'Email',     placeholder: 'alice@example.com', secure: false, keyboard: 'email-address' },
    { field: 'password', label: 'Password',  placeholder: '6+ characters',     secure: true,  keyboard: 'default' },
    { field: 'confirm',  label: 'Confirm Password', placeholder: 'Repeat password', secure: true, keyboard: 'default' },
  ];

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join Bazaar — it's free</Text>
        </View>

        <View style={styles.form}>
          {fields.map(({ field, label, placeholder, secure, keyboard }) => (
            <View key={field} style={{ marginBottom: spacing.md }}>
              <Text style={styles.label}>{label.toUpperCase()}</Text>
              <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={colors.muted}
                value={form[field]}
                onChangeText={set(field)}
                secureTextEntry={secure}
                keyboardType={keyboard}
                autoCapitalize={field === 'name' ? 'words' : 'none'}
              />
            </View>
          ))}

          <TouchableOpacity style={styles.btnPrimary} onPress={handleRegister} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnPrimaryText}>Create Account</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.switchWrap}>
            <Text style={styles.switchText}>
              Already have an account? <Text style={{ color: colors.accent }}>Sign in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: spacing.lg, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 32 },
  title: { fontSize: 36, color: colors.text, fontWeight: '300', letterSpacing: -0.5 },
  subtitle: { color: colors.subtext, fontSize: 14, marginTop: 4 },
  form: { backgroundColor: colors.card, borderRadius: radius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border },
  label: { fontSize: 11, color: colors.subtext, letterSpacing: 1, fontWeight: '600', marginBottom: 6 },
  input: {
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.md, padding: 14, color: colors.text, fontSize: 15
  },
  btnPrimary: {
    backgroundColor: colors.accent, borderRadius: radius.full,
    padding: 16, alignItems: 'center', marginTop: 8
  },
  btnPrimaryText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  switchWrap: { alignItems: 'center', marginTop: spacing.lg },
  switchText: { color: colors.subtext, fontSize: 14 },
});
