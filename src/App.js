import { useState } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import "./App.css";

// eslint-disable-next-line no-unused-vars

import LoginForm from "./components/LoginForm";
import AddEditRecipeForm from "./components/AddEditRecipeForm";
import FirebaseFirestoreService from "./FirebaseFirestoreService";

function App() {
  const [user, setUser] = useState(null);

  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    setUser(user);
    if (user) {
      const uid = user.uid;
    } else {
    }
  });

  const handleAddRecipe = async (newRecipe) => {
    try {
      await FirebaseFirestoreService.createDocument(newRecipe);
      alert("successfully added document");
    } catch (error) {
      alert(error.message, "here");
    }
  };

  return (
    <div className="App">
      <div className="title-row">
        <h1 className="title">Firebase recipes</h1>

        <LoginForm existingUser={user} />
      </div>
      <div className="main">
        <AddEditRecipeForm handleAddRecipe={handleAddRecipe} />
      </div>
    </div>
  );
}

export default App;
