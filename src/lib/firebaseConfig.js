import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyD0v45DoYw5msqwV41Gd3BUCN2RyJphREg",
    authDomain: "mantapa-22cfd.firebaseapp.com",
    projectId: "mantapa-22cfd",
    storageBucket: "mantapa-22cfd.appspot.com",
    messagingSenderId: "1073909669316",
    appId: "1:1073909669316:web:814264ef4ce817489c5891",
    measurementId: "G-3SKYDZ9YEC"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
