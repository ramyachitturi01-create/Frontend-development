import React from "react";
import "../styles/SupportCards.css";
import KpiMastersChart from "./KpiMastersChart";

const cards = [
  {
    title: "Average order value",
    value: "$1,406",
    subtitle: "This month",
    note: "+12.4%",
  },
  {
    title: "Customer retention",
    value: "86%",
    subtitle: "Repeat customers",
    note: "+4.8%",
  },
];

export default function SupportCards() {
  return (
    <div className="support-cards">
      <div className="support-cards__left">
        {cards.map((card) => (
          <div key={card.title} className="support-card">
            <h3>{card.title}</h3>
            <strong>{card.value}</strong>
            <p>{card.subtitle}</p>
            <span>{card.note}</span>
          </div>
        ))}
      </div>
      <div className="support-cards__right">
        <KpiMastersChart />
      </div>
    </div>
  );
}
