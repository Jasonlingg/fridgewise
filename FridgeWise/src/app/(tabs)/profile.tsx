import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import {auth, db} from '@/src/config/firebaseConfig';
import { signOut } from 'firebase/auth';

export default function ProfileScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  const fetchUserData = async () => {
    try {
      const user = auth.currentUser;
      console.log('Current user:', user?.uid);
      
      if (!user) {
        console.log('No user found in auth');
        Alert.alert('Error', 'No user is currently logged in.');
        router.replace('/');
        return;
      }

      const userDocRef = doc(db, 'users', user.uid);
      console.log('Fetching user document from:', userDocRef.path);
      
      const userDoc = await getDoc(userDocRef);
      console.log('Document exists:', userDoc.exists());
      console.log('Document data:', userDoc.data());

      if (userDoc.exists()) {
        const data = userDoc.data();
        console.log('Setting user data:', data);
        setUserData(data);
      } else {
        console.log('User document does not exist');
        Alert.alert('Error', 'User data not found.');
      }
    } catch (error: any) {
      console.error('Error fetching user data:', error);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      Alert.alert('Success', 'You have been signed out.');
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  useEffect(() => {
    console.log('Profile screen mounted');
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Failed to load user data.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.label}>First Name:</Text>
      <Text style={styles.value}>{userData.firstName}</Text>
      <Text style={styles.label}>Last Name:</Text>
      <Text style={styles.value}>{userData.lastName}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{userData.email}</Text>
      <Text style={styles.label}>Fridges:</Text>
      {userData.fridges && userData.fridges.length > 0 ? (
        userData.fridges.map((fridge: any, index: number) => (
          <Text key={index} style={styles.value}>
            {fridge.name}
          </Text>
        ))
      ) : (
        <Text style={styles.value}>No fridges available.</Text>
      )}
      <Text style={styles.signOut} onPress={handleSignOut}>
        Sign Out
      </Text>
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
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 5,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  signOut: {
    marginTop: 20,
    fontSize: 16,
    color: 'red',
    textDecorationLine: 'underline',
  },
});