import { useEffect, useState } from "react";
import axios from "axios";
// import DeleteIcon from "@mui/icons-material/Delete";
import "./admincss/ManageCampaigns.css";

const API_URL = `${import.meta.env.VITE_API_URL}/admin`;

export default function ManageCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch campaigns
  const displayCampaigns = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/allcampaigns`);
      setCampaigns(response.data);
    } catch (err) {
      setError("Failed to fetch campaigns... " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    displayCampaigns();
  }, []);

  // Delete campaign
  const deleteCampaign = async (id) => {
    try {
      await axios.delete(`${API_URL}/deletecampaign/${id}`);
      setError("");
      displayCampaigns();
    } catch (err) {
      setError("Unexpected error... " + err.message);
    }
  };

  // Filter logic
  const filteredCampaigns = campaigns.filter((c) => {
    const query = search.toLowerCase();

    const matchesSearch =
      c.title?.toLowerCase().includes(query) ||
      c.description?.toLowerCase().includes(query) ||
      c.category?.toLowerCase().includes(query);

    const matchesCategory =
      categoryFilter === "All" ||
      c.category?.toLowerCase() === categoryFilter.toLowerCase();

    const matchesStatus =
      statusFilter === "All" ||
      c.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="campaign-container">
      <h2 className="campaign-title">All Campaigns </h2>

      {/* 🔍 Filters */}
      <div className="filters">
        <input
          placeholder="🔍 Search by title, description, category"
          value={search}
          onChange={(e) => setSearch(e.target.value.trimStart())}
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

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All</option>
          <option>Active</option>
          <option>Completed</option>
          <option>Pending</option>
        </select>
      </div>

      {/* Table Rendering */}
      {error ? (
        <div className="table-error">{error}</div>
      ) : loading ? (
        <div className="table-loading">Loading campaigns...</div>
      ) : filteredCampaigns.length === 0 ? (
        <div className="table-empty">No Campaign Data Found</div>
      ) : (
        <div className="campaign-table-wrap">
          <table className="campaign-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Goal</th>
                <th>Collected</th>
                <th>Status</th>
                <th>Creator</th>
              
              </tr>
            </thead>
            <tbody>
              {filteredCampaigns.map((campaign) => (
                <tr key={campaign.id}>
                  <td>{campaign.id}</td>
                  <td>{campaign.title}</td>
                  <td>{campaign.category}</td>
                  <td>₹{campaign.goalAmount}</td>
                  <td>₹{campaign.collectedAmount}</td>
                  <td>{campaign.status}</td>
                  <td>{campaign.creator?.name || "—"}</td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
