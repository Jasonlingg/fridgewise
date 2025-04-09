import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { auth, db } from '@/src/config/firebaseConfig';
export default function CreateFridgeScreen() {
  const router = useRouter();
  const [fridgeName, setFridgeName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateFridge = async () => {
    if (!fridgeName) {
      Alert.alert('Error', 'Please enter a fridge name.');
      return;
    }

    // setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert('Error', 'No user is currently logged in.');
        router.replace('/');
        return;
      }
      console.log('User signed up:', auth.currentUser?.email);

      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        fridges: arrayUnion({
          id: `fridge-${Date.now()}`,
          name: fridgeName,
          items: [],
        }),
      });

      Alert.alert('Success', 'Fridge created successfully!');
      router.replace('/fridge');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Fridge</Text>
      <TextInput
        style={styles.input}
        placeholder="Fridge Name"
        value={fridgeName}
        onChangeText={setFridgeName}
      />
      <Button
        title={loading ? 'Creating...' : 'Create Fridge'}
        onPress={handleCreateFridge}
        disabled={loading}
      />
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
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
  },
});