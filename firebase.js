import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBVPjonnFYq3tmDl_dM9lOtqT5Oz1HVC-Y",
  authDomain: "wastewise-6bb48.firebaseapp.com",
  projectId: "wastewise-6bb48",
  storageBucket: "wastewise-6bb48.firebasestorage.app",
  messagingSenderId: "968963179738",
  appId: "1:968963179738:web:e0c7916841fd3cc6f651e3"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db, collection, addDoc };