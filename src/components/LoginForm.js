import FirebaseAuthService from "../FirebaseAuthService";
import { useState } from "react";

function LoginForm({ existingUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await FirebaseAuthService.loginUser(username, password);
      setUsername("");
      setPassword("");
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  const handleLogoutUser = () => {
    FirebaseAuthService.logoutUser();
  };

  const handleSendResetPasswordEmail = () => {
    FirebaseAuthService.passwordResetEmail(username);
  };

  const handleLoginWithGoogle = async (event) => {
    event.preventDefault();

    try {
      await FirebaseAuthService.loginWithGoogle(username, password);
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  return (
    <div className="login-form-container">
      {existingUser ? (
        <div className="row">
          <h3>Welcome, {existingUser.email}</h3>

          <button
            onClick={() => handleLogoutUser()}
            type="button"
            className="primary-button"
          >
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="login-form">
          <label className="input-label login-label">
            Username (email):{" "}
            <input
              required
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-text"
            />
          </label>
          <label className="input-label login-label">
            Password:{" "}
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-text"
            />
          </label>
          <div className="button-box">
            <button className="primary-button">Login</button>
            <button
              type="button"
              onClick={handleSendResetPasswordEmail}
              className="primary-button"
            >
              Reset Password
            </button>
            <button
              type="button"
              onClick={handleLoginWithGoogle}
              className="primary-button"
            >
              Login with Google
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default LoginForm;
