import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter, Slot } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/src/config/firebaseConfig';

export default function RootLayout() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in, navigate to the fridge screen
        setLoading(false); // Ensure loading is set to false before navigation
        router.replace('/fridge');
      } else {
        // User is not logged in, navigate to the login screen
        setLoading(false); // Ensure loading is set to false before navigation
        router.replace('/auth/login');
      }
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <Slot />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});