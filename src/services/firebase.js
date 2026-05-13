import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDtWPYm_WKV1nK8Af7dpqJ2pv1G75BdWwM",
  authDomain: "nex-volt-monitor-40738.firebaseapp.com",
  databaseURL:
    "https://nex-volt-monitor-40738-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nex-volt-monitor-40738",
  storageBucket: "nex-volt-monitor-40738.firebasestorage.app",
  messagingSenderId: "268312795243",
  appId: "1:268312795243:web:0cc80cb849678e51de792e",
  measurementId: "G-ZQX9WY3FYY",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);