import { initializeApp } from "firebase/app";
import {
  updateDoc,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";

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

const readDocuments = async ({ user, queryObj }) => {
  // not in use at the moment
  const queries = [queryObj];

  // not in use at the moment
  if (!user) {
    queries.push({
      field: "isPublished",
      condition: "==",
      value: true,
    });
  }
  try {
    let recipes = [];
    const querySnapshot = await getDocs(
      query(
        collection(db, "recipes"),
        where(queryObj.field, queryObj.condition, queryObj.value)
      )
    );
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      const data = doc.data();

      data.publishDate = new Date(data.publishDate.seconds * 1000);

      recipes.push({ ...data, id });
    });

    return recipes;
  } catch (error) {
    alert(error.message);
  }
};

const updateDocument = async (docId, updateObject) => {
  try {
    await updateDoc(doc(db, "recipes", docId), { ...updateObject });
  } catch (error) {
    alert(error.message);
  }
};

const deleteDocument = async (id) => {
  try {
    await deleteDoc(doc(db, "recipes", id));
  } catch (error) {
    alert(error.message);
  }
};

const FirebaseFirestoreService = {
  createDocument,
  readDocuments,
  updateDocument,
  deleteDocument,
};

export default FirebaseFirestoreService;
