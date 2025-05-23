// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

AsyncStorage.setItem("testKey", "testValue")
  .then(() => AsyncStorage.getItem("testKey"))
  .then((value) => console.log("AsyncStorage test value:", value))
  .catch((error) => console.error("AsyncStorage error:", error));
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB91ozisQHB3ceGFDh7yioL3UsOU7kOFkE",
  authDomain: "fridgeai-5a07a.firebaseapp.com",
  projectId: "fridgeai-5a07a",
  storageBucket: "fridgeai-5a07a.firebasestorage.app",
  messagingSenderId: "919067306514",
  appId: "1:919067306514:web:dc2c904f24238cf66b86cb",
  measurementId: "G-0JVS4KDRW9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

// Initialize Auth with AsyncStorage for persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});