import Layout from "../components/Layout";
import AnalyticsCharts from "../components/AnalyticsCharts";

function Analytics() {
  return (
    <Layout
      badge="Analytics"
      title="Analytics"
      description="Explore business analytics, trends, and performance metrics for smarter decision-making."
    >
      <div className="page-panel">
        <AnalyticsCharts />
      </div>
    </Layout>
  );
}

export default Analytics;
