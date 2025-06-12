// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAqm_WhTXtjP0soJA7HxmZam-jw2Bzs4KE",
  authDomain: "health-platform-ab04e.firebaseapp.com",
  projectId: "health-platform-ab04e",
  storageBucket: "health-platform-ab04e.firebasestorage.app",
  messagingSenderId: "762709820311",
  appId: "1:762709820311:web:611e8d0ec5a8156549fad2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
