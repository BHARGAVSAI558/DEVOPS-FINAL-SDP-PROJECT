import { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import "./admincss/ManageDonors.css"; 
const API_URL = `${import.meta.env.VITE_API_URL}/admin`;

export default function ManageDonors() {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch donors
  const displayDonors = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/alldonors`);
      setDonors(response.data);
    } catch (err) {
      setError("Failed to fetch donors... " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    displayDonors();
  }, []);

  // Delete donor
  const deleteDonor = async (id) => {
    try {
      await axios.delete(`${API_URL}/deletedonor/${id}`);
      setError("");
      displayDonors();
    } catch (err) {
      setError("Unexpected error... " + err.message);
    }
  };

  // ✅ Filter donors by search
  const filteredDonors = donors.filter((d) => {
    const query = search.toLowerCase();

    return (
      d.name?.toLowerCase().includes(query) ||
      d.email?.toLowerCase().includes(query) ||
      d.username?.toLowerCase().includes(query) ||
      d.mobileno?.toLowerCase().includes(query) ||
      d.location?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="patient-container">
      <h2 className="patient-title">Manage Donors</h2>

      {/* 🔍 Filters */}
      <div className="filters">
        <input
          placeholder="🔍 Search by name, email, username, mobile, location"
          value={search}
          onChange={(e) => setSearch(e.target.value.trimStart())}
        />
      </div>

      {/* Table Rendering */}
      {error ? (
        <div className="table-error">{error}</div>
      ) : loading ? (
        <div className="table-loading">Loading donors...</div>
      ) : filteredDonors.length === 0 ? (
        <div className="table-empty">No Donor Data Found</div>
      ) : (
        <table className="patient-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Username</th>
              <th>Mobile No</th>
              <th>Location</th>
             
            </tr>
          </thead>
          <tbody>
            {filteredDonors.map((donor) => (
              <tr key={donor.id}>
                <td>{donor.id}</td>
                <td>{donor.name}</td>
                <td>{donor.email}</td>
                <td>{donor.username}</td>
                <td>{donor.mobileno}</td>
                <td>{donor.location}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
