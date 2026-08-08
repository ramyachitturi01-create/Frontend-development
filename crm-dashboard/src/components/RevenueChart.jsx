import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../styles/RevenueChart.css";

const data = [
  { month: "Jan", revenue: 42000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 68000 },
  { month: "Apr", revenue: 74000 },
  { month: "May", revenue: 82000 },
  { month: "Jun", revenue: 94000 },
  { month: "Jul", revenue: 112000 },
  { month: "Aug", revenue: 124000 },
  { month: "Sep", revenue: 118000 },
  { month: "Oct", revenue: 103000 },
  { month: "Nov", revenue: 96000 },
  { month: "Dec", revenue: 88000 },
];

const yearMultipliers = { "2023": 0.82, "2024": 1, "2025": 1.18 };

function RevenueChart({ year = "2024" }) {
  const multiplier = yearMultipliers[year] ?? 1;
  const chartData = data.map((item) => ({ ...item, revenue: Math.round(item.revenue * multiplier) }));
  return (
    <div className="revenue-chart">
      <div className="revenue-chart__header">
        <div>
          <h2>Sales Volume</h2>
          <p>Monthly revenue performance for {year}.</p>
        </div>

        <div className="planning-panel">
          <div className="planning-panel__title">Planning KPIs</div>
          <div className="planning-panel__rows">
            <div className="planning-panel__row">
              <span>&gt; 130%</span>
              <strong>+5%</strong>
            </div>
            <div className="planning-panel__row">
              <span>= 100%</span>
              <strong>+3%</strong>
            </div>
            <div className="planning-panel__row">
              <span>&lt; 100%</span>
              <strong>+0%</strong>
            </div>
          </div>
          <div className="planning-panel__footer">
            <span className="planning-panel__score">142%</span>
            <span className="planning-panel__label">Total</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={chartData} margin={{ top: 18, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.32} />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.04} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(230, 229, 255, 0.75)" vertical={false} />
          <XAxis axisLine={false} tickLine={false} dataKey="month" tick={{ fill: 'var(--muted)', fontSize: 12 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} />
          <Tooltip cursor={{ fill: 'rgba(124, 58, 237, 0.08)' }} contentStyle={{ borderRadius: 16, border: 'none', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.12)' }} />
          <Area type="monotone" dataKey="revenue" stroke="#6133d9" strokeWidth={3} fill="url(#gradRevenue)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RevenueChart;
