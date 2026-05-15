import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJldkrEKlWScw7RD-8GOZCijphouIPG5o",
  authDomain: "plaster-calculator.firebaseapp.com",
  projectId: "plaster-calculator",
  storageBucket: "plaster-calculator.firebasestorage.app",
  messagingSenderId: "178974705858",
  appId: "1:178974705858:web:fdcacc9f0315ce17dc935b",
  measurementId: "G-TWJV8MHZ9B"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
