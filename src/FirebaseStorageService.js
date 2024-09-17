import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";

const config = {
  apiKey: "AIzaSyBjJdTTBbMI4iYrQC9_jxD5GarstpZnQPA",
  authDomain: "fir-recipes-85457.firebaseapp.com",
  projectId: "fir-recipes-85457",
  storageBucket: "fir-recipes-85457.appspot.com",
  messagingSenderId: "756047237250",
  appId: "1:756047237250:web:191c5e5885dd529d67a49b",
  measurementId: "G-V85TW2406K",
};

// Initialize Firebase
const app = initializeApp(config);

const storage = getStorage(app);

const uploadFile = (file, fullFilePath, progressCallback) => {
  const storageRef = ref(storage, fullFilePath);

  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );

      progressCallback(progress);
    },
    (error) => {
      throw error;
    }
  );

  return uploadTask.then(async () => {
    const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
    return downloadUrl;
  });
};

const deleteFile = (fileDownloadUrl) => {
  const decodedUrl = decodeURIComponent(fileDownloadUrl);
  const startIndex = decodedUrl.indexOf("/o/") + 3;
  const endIndex = decodedUrl.indexOf("?");
  // eslint-disable-next-line no-unused-vars
  const filePath = decodedUrl.substring(startIndex, endIndex);

  const desertRef = ref(storage, fileDownloadUrl);

  deleteObject(desertRef)
    .then(() => {
      alert("file deleted successfully");
    })
    .catch((error) => {
      alert(error.message);
    });
};

const FirebaseStorageService = {
  deleteFile,
  uploadFile,
};

export default FirebaseStorageService;
