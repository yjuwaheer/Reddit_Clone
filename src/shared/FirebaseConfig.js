// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8X5Sr2KvJXuVSVLJvN3t7jSKQmts3xyE",
  authDomain: "testapp-d3881.firebaseapp.com",
  projectId: "testapp-d3881",
  storageBucket: "testapp-d3881.appspot.com",
  messagingSenderId: "8869824824",
  appId: "1:8869824824:web:6fe012efc30b0430f619cd",
  measurementId: "G-1YE52QSCCD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
