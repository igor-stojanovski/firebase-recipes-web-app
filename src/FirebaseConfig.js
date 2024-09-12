import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { getFirestore } from "firebase/firestore";

// const config = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
// };

const config = {
  apiKey: "AIzaSyBjJdTTBbMI4iYrQC9_jxD5GarstpZnQPA",
  authDomain: "fir-recipes-85457.firebaseapp.com",
  projectId: "fir-recipes-85457",
  storageBucket: "fir-recipes-85457.appspot.com",
  messagingSenderId: "756047237250",
  appId: "1:756047237250:web:191c5e5885dd529d67a49b",
  measurementId: "G-V85TW2406K",
};

// if (!firebase.app.length) {
const app = initializeApp(config);
// eslint-disable-next-line no-unused-vars
const db = getFirestore(app);

//   firebase.initializeApp(config);
// }

export default firebase;
