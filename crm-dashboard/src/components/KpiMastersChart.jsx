import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import "../styles/KpiMastersChart.css";

const data = [
  { month: "Plan", value: 24 },
  { month: "Jan", value: 23 },
  { month: "Feb", value: 28 },
  { month: "Mar", value: 32 },
  { month: "Apr", value: 31 },
  { month: "May", value: 32 },
  { month: "Jun", value: 30 },
  { month: "Jul", value: 32 },
  { month: "Aug", value: 31, highlight: true },
  { month: "Sep", value: 32 },
  { month: "Oct", value: 31 },
  { month: "Nov", value: 32 },
  { month: "Dec", value: 28 },
];

export default function KpiMastersChart() {
  return (
    <div className="kpi-masters-chart">
      <div className="kpi-masters-chart__title">Monthly orders</div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 16, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ede7ff" />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "var(--muted)", fontSize: 12 }} />
          <Tooltip cursor={{ fill: "rgba(124, 58, 237, 0.08)" }} />
          <Bar dataKey="value" radius={[10, 10, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={entry.month}
                fill={entry.highlight ? "#7c3aed" : "#d6c7f2"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
