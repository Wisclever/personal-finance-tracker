import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyABXrbzcFxtLap6xU-Im9GjTd3Ub6_LhMI",
    authDomain: "personal-finance-tracker-e370d.firebaseapp.com",
    projectId: "personal-finance-tracker-e370d",
    storageBucket: "personal-finance-tracker-e370d.firebasestorage.app",
    messagingSenderId: "396537335789",
    appId: "1:396537335789:web:81e13aa4dadb68bc4f21e4"
};

// เริ่มต้น Firebase App
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
