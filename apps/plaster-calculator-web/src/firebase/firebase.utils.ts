import { initializeApp, getApps } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getStorage, connectStorageEmulator } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCJldkrEKlWScw7RD-8GOZCijphouIPG5o",
    authDomain: "plaster-calculator.firebaseapp.com",
    projectId: "plaster-calculator",
    storageBucket: "plaster-calculator.firebasestorage.app",
    messagingSenderId: "178974705858",
    appId: "1:178974705858:web:fdcacc9f0315ce17dc935b",
    measurementId: "G-TWJV8MHZ9B",
};

const app =
    getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const functions = getFunctions(app);
export const storage = getStorage(app);

if (process.env.NODE_ENV === "development") {
    connectAuthEmulator(auth, "http://127.0.0.1:9099", {
        disableWarnings: true,
    });
    connectFunctionsEmulator(functions, "127.0.0.1", 5001);
    connectStorageEmulator(storage, "127.0.0.1", 9199);
}
