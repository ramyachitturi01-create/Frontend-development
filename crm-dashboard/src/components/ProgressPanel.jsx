import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import "../styles/ProgressPanel.css";

const COLORS = ["#7c3aed", "#ede7ff"];
const yearData = {
  "2023": { completed: 62, metrics: [22, 8, 4] },
  "2024": { completed: 67, metrics: [24, 6, 2] },
  "2025": { completed: 74, metrics: [28, 5, 1] },
};

export default function ProgressPanel({ year = "2024" }) {
  const current = yearData[year] ?? yearData["2024"];
  const chartData = [
    { name: "complete", value: current.completed },
    { name: "remaining", value: 100 - current.completed },
  ];
  const metrics = [
    { label: "Delivered on time", value: current.metrics[0] },
    { label: "Awaiting fulfilment", value: current.metrics[1] },
    { label: "Needs attention", value: current.metrics[2] },
  ];

  return (
    <div className="progress-panel">
      <div className="progress-panel__header"><h2>Order fulfilment</h2></div>
      <div className="progress-panel__body">
        <div className="progress-chart">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} dataKey="value" cx="50%" cy="50%" innerRadius="64%" outerRadius="88%" startAngle={90} endAngle={-270} paddingAngle={2}>
                {chartData.map((item, index) => <Cell key={item.name} fill={COLORS[index]} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="progress-chart__center">
            <strong>{current.completed}%</strong>
            <span>on-time orders</span>
          </div>
        </div>
        <div className="progress-metrics">
          <span className="progress-metrics__count">Orders in {year}</span>
          {metrics.map((item) => (
            <div key={item.label} className="progress-metrics__row"><span>{item.label}</span><strong>{item.value}</strong></div>
          ))}
        </div>
      </div>
    </div>
  );
}
