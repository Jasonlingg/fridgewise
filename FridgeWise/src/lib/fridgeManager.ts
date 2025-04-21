// lib/fridgeManager.ts
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { SHELF_LIFE_AI } from '../constants/shelfLife';

export const addToFridge = async (ingredients: string[]) => {
  const user = auth().currentUser;
  if (!user) throw new Error('Not logged in');
  const batch = firestore().batch();
  const fridgeRef = firestore().collection('fridge');

  ingredients.forEach(name => {
    const normalized = name.toLowerCase().replace(/[^a-z]/g, '');
    const docRef = fridgeRef.doc();
    batch.set(docRef, {
      name: normalized,
      added: firestore.FieldValue.serverTimestamp(),
      expiresIn: SHELF_LIFE_AI[normalized] || 3, // Default 3 days
      userId: user.uid
    });
  });

  await batch.commit();
};
