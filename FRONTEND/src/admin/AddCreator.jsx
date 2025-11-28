import { useState } from "react";
import axios from "axios";
import "./admincss/AddCreator.css";

const API_URL = `${import.meta.env.VITE_API_URL}/admin`;

export default function AddCreator() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    email: "",
    username: "",
    password: "",
    mobileno: "",
    location: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/addcreator`, formData);
      setMessage(res.data);
      setError("");

      setFormData({
        name: "",
        category: "",
        email: "",
        username: "",
        password: "",
        mobileno: "",
        location: ""
      });
    } catch (err) {
      setMessage("");
      setError(err.response ? err.response.data : "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="creator-container">
      <div className="creator-form">
        <h2>Add Creator</h2>

        {message && <p className="success-msg">{message}</p>}
        {error && <p className="error-msg">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option>Startup</option>
                <option>Charity</option>
                <option>Sponsorship</option>
                <option>Healthcare</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="mobileno">Mobile Number</label>
              <input
                type="tel"
                id="mobileno"
                value={formData.mobileno}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group full">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button disabled={loading} type="submit" className="btn-submit">
            {loading ? "Adding..." : "Add Creator"}
          </button>
        </form>
      </div>
    </div>
  );
}
