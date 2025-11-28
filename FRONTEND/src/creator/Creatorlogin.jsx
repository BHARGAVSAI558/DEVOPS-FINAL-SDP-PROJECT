import { useState } from "react";
import { FiUser, FiLock } from "react-icons/fi";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contextapi/AuthContext";
import "./creatorcss/CreatorLogin.css";

const API_URL = `${import.meta.env.VITE_API_URL}/creator`;

export default function CreatorLogin() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setIsCreatorLoggedIn } = useAuth();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post(`${API_URL}/checklogin`, formData);

      if (res.status === 200) {
        // Save creator data (persist across tabs/sessions)
        const creatorStr = JSON.stringify(res.data);
        localStorage.setItem("creator", creatorStr);
        sessionStorage.setItem("creator", creatorStr); // fallback for existing code
        setIsCreatorLoggedIn(true);

        // Redirect to dashboard
        navigate("/creator/dashboard");
      }
    } catch (err) {
      // Handle error from backend
      if (err.response) {
        setError(err.response.data);
      } else {
        setError("Unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Creator Login</h2>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Email / Username</label>
          <div className="input-group">
            <FiUser className="input-icon" />
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <label htmlFor="password">Password</label>
          <div className="input-group">
            <FiLock className="input-icon" />
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>

        <div className="signup-section">
          
          <p>Contact admin team for platform access</p>
        </div>
      </div>
    </div>
  );
}