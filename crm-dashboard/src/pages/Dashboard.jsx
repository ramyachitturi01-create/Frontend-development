import Layout from "../components/Layout";
import TopToolbar from "../components/TopToolbar";
import ProgressPanel from "../components/ProgressPanel";
import RevenueChart from "../components/RevenueChart";
import SupportCards from "../components/SupportCards";
import RightKpis from "../components/RightKpis";

function Dashboard() {
  const [selectedYear, setSelectedYear] = useState("2024");
  return (
    <Layout
      compact
    >
      <TopToolbar selectedYear={selectedYear} onYearChange={setSelectedYear} />
      <div className="compact-titlebar">
        <div>
          <span>ORDER PERFORMANCE</span>
          <h1>Customer order overview · {selectedYear}</h1>
        </div>
        <button className="primary-btn">Create report</button>
      </div>

      <div className="dashboard-grid dashboard-grid--compact">
        <section className="dashboard-panel">
          <ProgressPanel year={selectedYear} />
        </section>

        <section className="dashboard-panel">
          <RevenueChart year={selectedYear} />
        </section>

        <aside className="dashboard-panel right-kpis-panel">
          <RightKpis year={selectedYear} />
        </aside>
      </div>

      <div className="dashboard-bottom-row"><SupportCards year={selectedYear} /></div>
    </Layout>
  );
}

export default Dashboard;
import { useState } from "react";
