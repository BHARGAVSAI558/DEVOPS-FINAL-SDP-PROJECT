import { useState } from "react";
import { NavLink, useNavigate, Routes, Route } from "react-router-dom";
import { useAuth } from "../contextapi/AuthContext";
import { FiUser, FiLogOut, FiMenu, FiX } from "react-icons/fi";

// Import Admin components
import AdminDashboard from "./AdminDashboard";
import ManageCampaigns from "./ManageCampaigns";
import ManageDonors from "./ManageDonors";
import ManageCreators from "./ManageCreators";
// import FundTracking from "./FundTracking";
import ReportsAndAnalytics from "./ReportsAndAnalytics";
import AddCreator from "./AddCreator";

// Styles
import "./admincss/AdminNavBar.css";

export default function AdminNavBar() {
  const navigate = useNavigate();
  const { setIsAdminLoggedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleLogout() {
    sessionStorage.clear();
    setIsAdminLoggedIn(false);
    navigate("/admin/login", { replace: true });
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="admin-app-container">
      {/* Horizontal Navbar */}
      <nav className="admin-navbar">
        <div className="admin-logo">
          <span className="admin-logo-icon">🛡️</span>
          <span className="admin-logo-text">HopeRaise Admin</span>
        </div>

        <button className="admin-menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        <ul className={`admin-nav-links ${isMenuOpen ? "active" : ""}`}>
          <li>
            <NavLink to="/admin/dashboard" onClick={() => setIsMenuOpen(false)}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/manage-campaigns" onClick={() => setIsMenuOpen(false)}>
              Campaigns
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/manage-donors" onClick={() => setIsMenuOpen(false)}>
              Donors
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/manage-creators" onClick={() => setIsMenuOpen(false)}>
              Creators
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-creator" onClick={() => setIsMenuOpen(false)}>
              Add Creator
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/admin/funds" onClick={() => setIsMenuOpen(false)}>
              Funds
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/admin/reports" onClick={() => setIsMenuOpen(false)}>
              Reports
            </NavLink>
          </li>
          <li className="admin-user-section">
            <div className="admin-user-info">
              <FiUser className="admin-user-icon" />
              <span>Admin</span>
            </div>
            <button className="admin-logout-btn" onClick={handleLogout}>
              <FiLogOut />
              Logout
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <main className="admin-main-content">
        <Routes>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/manage-campaigns" element={<ManageCampaigns />} />
          <Route path="/admin/manage-donors" element={<ManageDonors />} />
          <Route path="/admin/manage-creators" element={<ManageCreators />} />
          <Route path="/admin/add-creator" element={<AddCreator />} />
          {/* <Route path="/admin/funds" element={<FundTracking />} /> */}
          <Route path="/admin/reports" element={<ReportsAndAnalytics />} />
        </Routes>
      </main>
    </div>
  );
}