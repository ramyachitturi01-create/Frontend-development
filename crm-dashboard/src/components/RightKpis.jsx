import React from "react";
import "../styles/RightKpis.css";

const stats = [
  { title: "Count Orders", value: "32", color: "#8b5cf6" },
  { title: "Net Profit", value: "$55 980", color: "#a78bfa" },
  { title: "Total Costs", value: "$65 020", color: "#ff2e78" },
];

const yearMultipliers = { "2023": 0.82, "2024": 1, "2025": 1.18 };

export default function RightKpis({ year = "2024" }) {
  const multiplier = yearMultipliers[year] ?? 1;
  const visibleStats = stats.map((stat, index) => {
    const raw = [32, 55980, 65020][index] * multiplier;
    const value = index === 0 ? Math.round(raw).toString() : `$${Math.round(raw).toLocaleString()}`;
    return { ...stat, value };
  });
  return (
    <div className="right-kpis">
      {visibleStats.map((s, i) => (
        <div className="right-kpi" key={i} style={{ borderLeft: `6px solid ${s.color}` }}>
          <div className="right-kpi__title">{s.title}</div>
          <div className="right-kpi__value">{s.value}</div>
        </div>
      ))}

      <button className="primary-btn" style={{ width: "100%", marginTop: 18 }}>More Details</button>
    </div>
  );
}
