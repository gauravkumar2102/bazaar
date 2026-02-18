import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { colors } from '../utils/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ShopStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          height: 70
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.subtext,
        tabBarLabelStyle: { fontSize: 11, marginTop: 2 }
      }}
    >
      <Tab.Screen
        name="Shop"
        component={ShopStack}
        options={{ tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>🏪</Text>, tabBarLabel: 'Shop' }}
      />
      <Tab.Screen
        name="Saved"
        component={FavoritesScreen}
        options={{ tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>♡</Text>, tabBarLabel: 'Saved' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>👤</Text>, tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="Auth" component={AuthStack} />
          </>
        ) : (
          <>
            <Stack.Screen name="Auth" component={AuthStack} />
            <Stack.Screen name="Main" component={MainTabs} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
