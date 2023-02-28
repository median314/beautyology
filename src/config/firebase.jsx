import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApA1MkYt2UTqkRc66Bp60Y6VVf33tcCy0",
  authDomain: "beautyology-web-admin.firebaseapp.com",
  projectId: "beautyology-web-admin",
  storageBucket: "beautyology-web-admin.appspot.com",
  messagingSenderId: "647544041513",
  appId: "1:647544041513:web:b8cee3bba8d430ca9e6c38",
  measurementId: "G-BK6Y9VTY61",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);
const auth = getAuth();

export { analytics, storage, db, auth };

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDszU0RNYyRiYFxvVElFugqZrTtEi5R_U8",
//   authDomain: "beautyology-id.firebaseapp.com",
//   projectId: "beautyology-id",
//   storageBucket: "beautyology-id.appspot.com",
//   messagingSenderId: "1096625501074",
//   appId: "1:1096625501074:web:1d9f38fef534faeb88074b",
//   measurementId: "G-2B7W7P32F3"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
