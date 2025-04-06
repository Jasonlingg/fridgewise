import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';

export default function AuthScreen() {
  const router = useRouter();

  const handleLogin = () => {
    // Navigate to the login screen
    router.push('/auth/login');
  };

  const handleSignup = () => {
    // Navigate to the signup screen
    router.push('/auth/signup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the App</Text>
      <Button title="Login" onPress={handleLogin} />
      <View style={styles.spacing} />
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  spacing: {
    height: 10, // Add spacing between the buttons
  },
});