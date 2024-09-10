import { useState } from "react";
import FirebaseAuthService from "./FirebaseAuthService";

import "./App.css";

// eslint-disable-next-line no-unused-vars
import firebase from "./FirebaseConfig";
import LoginForm from "./components/LoginForm";

function App() {
  const [user, setUser] = useState(null);

  FirebaseAuthService.subscribeToAuthChanges(setUser);

  return (
    <div className="App">
      <div className="title-row">
        <h1 className="title">Firebase recipes</h1>
        <LoginForm existingUser={user} />
      </div>
    </div>
  );
}

export default App;
