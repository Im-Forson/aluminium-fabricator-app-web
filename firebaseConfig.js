import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBWtreJFFDro_EQQhZiXVC3HnPgpvB-fQ8",
    authDomain: "aluminium-fabricator-mate.firebaseapp.com",
    projectId: "aluminium-fabricator-mate",
    storageBucket: "aluminium-fabricator-mate.firebasestorage.app",
    messagingSenderId: "1087573137382",
    appId: "1:1087573137382:web:7d6e07e0ece0bcf5f7e827",
    measurementId: "G-ZZCTWHG8RR"
};
      
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();

export { database };