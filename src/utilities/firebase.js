// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Import .env file; it is used in firebaseConfig even though it appears dim
import * as env from "../../.env";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;