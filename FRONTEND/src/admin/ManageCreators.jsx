import { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import "./admincss/ManageCreators.css";

const API_URL = `${import.meta.env.VITE_API_URL}/admin`;

export default function ManageCreators() {
  const [creators, setCreators] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Fetch creators
  const displayCreators = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/allcreators`);
      setCreators(response.data);
    } catch (err) {
      setError("Failed to fetch creators: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    displayCreators();
  }, []);

  // Delete creator
  const confirmDelete = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const deleteCreator = async () => {
    try {
      await axios.delete(`${API_URL}/deletecreator/${selectedId}`);
      displayCreators();
      setShowModal(false);
      setError("");
    } catch (err) {
      setError("Error deleting creator: " + err.message);
    }
  };

  // Search + Category Filter
  const filteredCreators = creators.filter((c) => {
    const query = search.toLowerCase();

    const matchesSearch =
      c.name?.toLowerCase().includes(query) ||
      c.email?.toLowerCase().includes(query) ||
      c.username?.toLowerCase().includes(query) ||
      c.mobileno?.toLowerCase().includes(query) ||
      c.location?.toLowerCase().includes(query);

    const matchesCategory =
      categoryFilter === "All" ||
      c.category?.toLowerCase() === categoryFilter.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="creator-container">
      <h2>Manage Creators</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by name, email, username, mobile, location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option>All</option>
          <option>Startup</option>
          <option>Charity</option>
          <option>Sponsorship</option>
          <option>Healthcare</option>
        </select>
      </div>

      {error && <div className="table-error">{error}</div>}
      {loading && <div className="table-loading">Loading creators...</div>}
      {!loading && filteredCreators.length === 0 && (
        <div className="table-empty">No Creator Data Found</div>
      )}

      {filteredCreators.length > 0 && (
        <div className="table-wrapper">
          <table className="creator-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Username</th>
                <th>Mobile</th>
                <th>Category</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredCreators.map((creator) => (
                <tr key={creator.id}>
                  <td>{creator.id}</td>
                  <td>{creator.name}</td>
                  <td>{creator.email}</td>
                  <td>{creator.username}</td>
                  <td>{creator.mobileno}</td>
                  <td>
                    <span
                      className={`badge category ${creator.category?.toLowerCase()}`}
                    >
                      {creator.category}
                    </span>
                  </td>
                  <td>{creator.location}</td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => confirmDelete(creator.id)}
                    >
                      <DeleteIcon fontSize="small" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this creator?</p>

            <div className="modal-actions">
              <button className="modal-btn delete" onClick={deleteCreator}>
                Yes, Delete
              </button>

              <button
                className="modal-btn cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
