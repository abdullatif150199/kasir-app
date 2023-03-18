import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyABGKWr0fyODsARv13uMjfImdp0EUMciLc",
  authDomain: "myproject-86843.firebaseapp.com",
  projectId: "myproject-86843",
  storageBucket: "myproject-86843.appspot.com",
  messagingSenderId: "596121383690",
  appId: "1:596121383690:web:e1850cb8e1c96a871100f3",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth(app);

export default app;
