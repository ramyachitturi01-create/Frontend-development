import React from "react";
import "../styles/TopToolbar.css";

const yearTabs = ["2023", "2024", "2025"];

export default function TopToolbar({ selectedYear, onYearChange }) {
  return (
    <div className="dashboard-topbar">
      <div className="topbar-left">
        <div className="rating-pill">
          <span className="rating-stars">Customer orders</span>
          <span>Live</span>
        </div>
        <div className="year-tabs" aria-label="Select reporting year">
          {yearTabs.map((year) => (
            <button
              key={year}
              type="button"
              className={`year-pill ${year === selectedYear ? "active" : ""}`}
              onClick={() => onYearChange(year)}
              aria-pressed={year === selectedYear}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
      <div className="topbar-right"><span className="topbar-status">Reporting period: {selectedYear}</span></div>
    </div>
  );
}
