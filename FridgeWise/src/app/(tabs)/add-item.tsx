import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AddItemScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add an Item</Text>
      <Text>Scan a barcode or manually add an item. LOL</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});