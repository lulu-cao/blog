// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${process.env.VUE_APP_apiKey}`,
  authDomain: `${process.env.VUE_APP_authDomain}`,
  projectId: `${process.env.VUE_APP_projectId}`,
  storageBucket: `${process.env.VUE_APP_storageBucket}`,
  messagingSenderId: `${process.env.VUE_APP_messagingSenderId}`,
  appId: `${process.env.VUE_APP_appId}`
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;