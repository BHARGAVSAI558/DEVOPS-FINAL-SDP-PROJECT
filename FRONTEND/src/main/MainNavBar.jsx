import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

// Pages
import Home from "./Home";
import Contact from "./Contact";
import NotFound from "./NotFound";
import DonorLogin from "./../donor/DonorLogin";
import DonorRegistration from "./../donor/DonorRegistration";
import AdminLogin from "../admin/AdminLogin";
import CreatorLogin from "../creator/Creatorlogin";


// Assets
import logo from "../assets/logo1.png";

// Icons
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// Styles
import "./maincss/style.css";

export default function MainNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    console.log("Toggling dropdown, isDropdownOpen:", !isDropdownOpen); // Debug log
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    console.log("Closing dropdown"); // Debug log
    setIsDropdownOpen(false);
  };

  return (
    <div className="app-container" onClick={() => closeDropdown()}>
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="FundsConnect Logo" className="logo-img" />
          <span>HopeRaise</span>
        </div>

        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/donor/registration" onClick={() => setIsMenuOpen(false)}>Donor SignUp</Link>
          </li>

          <li className={`dropdown ${isDropdownOpen ? "active" : ""}`}>
            <button
              className="dropdown-toggle"
              onClick={toggleDropdown}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  toggleDropdown();
                }
              }}
            >
              Login <KeyboardArrowDownIcon className={`dropdown-icon ${isDropdownOpen ? "rotate" : ""}`} />
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link to="/donor/login" onClick={() => { setIsMenuOpen(false); closeDropdown(); }}>Donor</Link>
              </li>
              <li>
                <Link to="/creator/login" onClick={() => { setIsMenuOpen(false); closeDropdown(); }}>Creator</Link>
              </li>
              <li>
                <Link to="/admin/login" onClick={() => { setIsMenuOpen(false); closeDropdown(); }}>Admin</Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/donor/login" element={<DonorLogin />} />
        <Route path="/donor/registration" element={<DonorRegistration />} />
        <Route path="/creator/login" element={<CreatorLogin />} />
       
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
