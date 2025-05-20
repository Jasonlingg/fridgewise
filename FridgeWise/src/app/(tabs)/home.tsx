import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

// Sample food items data
const foodItems = [
  { id: 1, name: 'Milk', expiryDate: '2024-03-25' },
  { id: 2, name: 'Eggs', expiryDate: '2024-03-28' },
  { id: 3, name: 'Cheese', expiryDate: '2024-04-01' },
  { id: 4, name: 'Yogurt', expiryDate: '2024-03-26' },
  { id: 5, name: 'Butter', expiryDate: '2024-04-05' },
  { id: 6, name: 'Ham', expiryDate: '2024-03-27' },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Fridge</Text>
      
      {/* Fridge Container */}
      <View style={styles.fridgeContainer}>
        {/* Fridge Door */}
        <View style={styles.fridgeDoor}>
          <View style={styles.doorHandle} />
        </View>
        
        {/* Fridge Content */}
        <ScrollView style={styles.fridgeContent}>
          <View style={styles.foodGrid}>
            {foodItems.map((item) => (
              <TouchableOpacity key={item.id} style={styles.foodItem}>
                <Text style={styles.foodName}>{item.name}</Text>
                <Text style={styles.expiryDate}>Expires: {item.expiryDate}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  fridgeContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fridgeDoor: {
    height: 60,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  doorHandle: {
    width: 40,
    height: 8,
    backgroundColor: '#d0d0d0',
    borderRadius: 4,
  },
  fridgeContent: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  foodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  foodItem: {
    width: '45%',
    backgroundColor: '#ffffff',
    margin: '2.5%',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  expiryDate: {
    fontSize: 12,
    color: '#666',
  },
});