import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyBjJdTTBbMI4iYrQC9_jxD5GarstpZnQPA",
  authDomain: "fir-recipes-85457.firebaseapp.com",
  projectId: "fir-recipes-85457",
  storageBucket: "fir-recipes-85457.appspot.com",
  messagingSenderId: "756047237250",
  appId: "1:756047237250:web:191c5e5885dd529d67a49b",
  measurementId: "G-V85TW2406K",
};

const app = initializeApp(config);
const db = getFirestore(app);

const createDocument = async (document) => {
  try {
    await addDoc(collection(db, "recipes"), document);
  } catch (error) {
    alert(error.message);
  }
};

const FirebaseFirestoreService = {
  createDocument,
};

export default FirebaseFirestoreService;
