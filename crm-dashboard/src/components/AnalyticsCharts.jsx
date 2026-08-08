import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import salesData from "../data/sales.json";

const COLORS = ["#8b5cf6", "#a78bfa", "#f59e0b", "#ef4444"];

function aggregateByMonth(data) {
  const map = new Map();
  data.forEach((d) => {
    const date = new Date(d.date);
    const key = date.toLocaleString("default", { month: "short" });
    const entry = map.get(key) || { month: key, revenue: 0, orders: 0 };
    entry.revenue += Number(d.amount || 0);
    entry.orders += 1;
    map.set(key, entry);
  });
  return Array.from(map.values());
}

function statusCounts(data) {
  const map = new Map();
  data.forEach((d) => {
    const s = d.status || "Unknown";
    map.set(s, (map.get(s) || 0) + 1);
  });
  return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
}

export default function AnalyticsCharts({ data = salesData }) {
  const monthly = useMemo(() => aggregateByMonth(data), [data]);
  const status = useMemo(() => statusCounts(data), [data]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <div style={{ height: 300 }} className="dashboard-panel">
        <h3 style={{ marginTop: 0 }}>Revenue Over Time</h3>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={monthly} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gradLine" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.32} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(200,200,220,0.36)" />
            <XAxis dataKey="month" tick={{ fill: 'var(--muted)' }} />
            <YAxis tick={{ fill: 'var(--muted)' }} />
            <Tooltip />
            <Area type="monotone" dataKey="revenue" stroke="#6133d9" strokeWidth={3} fill="url(#gradLine)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div style={{ height: 300 }} className="dashboard-panel">
        <h3 style={{ marginTop: 0 }}>Orders by Status</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={monthly} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(200,200,220,0.36)" />
            <XAxis dataKey="month" tick={{ fill: 'var(--muted)' }} />
            <YAxis tick={{ fill: 'var(--muted)' }} />
            <Tooltip />
            <Bar dataKey="orders">
              {monthly.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={entry.month === 'Aug' ? '#6133d9' : '#d9ccf4'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ gridColumn: "1 / -1" }} className="dashboard-panel">
        <h3 style={{ marginTop: 0 }}>Order Status Distribution</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <ResponsiveContainer width="40%" height={180}>
            <PieChart>
              <Pie data={status} dataKey="value" nameKey="name" innerRadius={40} outerRadius={70} fill="#8884d8" label>
                {status.map((_, idx) => (
                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div style={{ flex: 1 }}>
            <p style={{ marginTop: 0, color: "#6b7280" }}>
              Overview of order statuses for the selected period. Use this to identify pending or refunded items.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
