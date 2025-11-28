// src/components/TransactionHistory.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./donorcss/TransactionHistory.css";

const DONATION_API = `${import.meta.env.VITE_API_URL}/donation`;

const getCurrentDonor = () => {
  try {
    const raw = localStorage.getItem("currentDonor");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  // NEW – modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);

  useEffect(() => {
    const loadTransactions = async () => {
      const donor = getCurrentDonor();
      if (!donor) {
        setError("Please log in to view your transaction history.");
        return;
      }

      try {
        const res = await axios.get(`${DONATION_API}/by-donor/${donor.id}`);
        setTransactions(res.data || []);
        setError("");
      } catch (err) {
        setError("Failed to load transaction history.");
      }
    };

    loadTransactions();
  }, []);

  const formatDateTime = (dtString) => {
    if (!dtString) return "—";
    try {
      const d = new Date(dtString);
      return d.toLocaleString();
    } catch {
      return String(dtString).replace("T", " ").slice(0, 16);
    }
  };

  // Open modal
  const handleView = (tx) => {
    setSelectedTx(tx);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setSelectedTx(null);
    setShowModal(false);
  };

  return (
    <div className="tx-container">
      <h2 className="tx-heading">Transaction History</h2>

      {error && <p className="tx-error">{error}</p>}

      {!transactions.length && !error ? (
        <p className="tx-empty">You have not donated yet.</p>
      ) : (
        <div className="tx-grid">
          {transactions.map((t) => (
            <div className="tx-card" key={t.id}>
              <div className="tx-card-header">
                <div>
                  <div className="tx-campaign-title">
                    {t.campaign?.title || "Campaign"}
                  </div>
                  <div className="tx-campaign-category">
                    {t.campaign?.category || "General"}
                  </div>
                </div>
                <div className="tx-amount">₹{t.amount}</div>
              </div>

              <div className="tx-body">
                <div className="tx-row">
                  <span className="tx-label">Donation ID</span>
                  <span className="tx-value">#{t.id}</span>
                </div>
                <div className="tx-row">
                  <span className="tx-label">Date & Time</span>
                  <span className="tx-value">
                    {formatDateTime(t.donationDate)}
                  </span>
                </div>
                <div className="tx-row">
                  <span className="tx-label">Message</span>
                  <span className="tx-value">{t.message || "—"}</span>
                </div>
              </div>

              <div className="tx-footer">
                <button
                  className="tx-receipt-btn"
                  onClick={() => handleView(t)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===========================
             VIEW MODAL
      ============================ */}
      {showModal && selectedTx && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Donation Details</h3>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>

            <div className="modal-body">
              <p className="modal-info">
                <strong>Campaign:</strong> {selectedTx.campaign?.title}
              </p>

              <p className="modal-info">
                <strong>Category:</strong> {selectedTx.campaign?.category}
              </p>

              <p className="modal-info">
                <strong>Amount:</strong> ₹{selectedTx.amount}
              </p>

              <p className="modal-info">
                <strong>Donation ID:</strong> #{selectedTx.id}
              </p>

              <p className="modal-info">
                <strong>Date:</strong> {formatDateTime(selectedTx.donationDate)}
              </p>

              <p className="modal-info">
                <strong>Message:</strong> {selectedTx.message || "—"}
              </p>

              <div className="modal-actions">
                <button className="modal-btn primary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionHistory;
