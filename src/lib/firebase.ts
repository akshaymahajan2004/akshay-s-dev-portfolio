import {initializeApp} from "firebase/app"
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAHkhvWPQKQmapkc_w8ZnU1iFPNT553pws",
  authDomain: "akshay-dev-1274.firebaseapp.com",
  projectId: "akshay-dev-1274",
  storageBucket: "akshay-dev-1274.firebasestorage.app",
  messagingSenderId: "378099123838",
  appId: "1:378099123838:web:3b5a76b3c7e6619aee7a2f",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
