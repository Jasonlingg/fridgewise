import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function FridgeScreen() {
  const router = useRouter();

  const handleCreateFridge = () => {
    router.push('/fridge/create-fridge'); // Navigate to the create-fridge screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fridge</Text>
      <Button title="Create New Fridge" onPress={handleCreateFridge} />
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
});