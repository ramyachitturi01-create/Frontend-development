import Layout from "../components/Layout";
import OrdersTable from "../components/OrdersTable";

function Today() {
  return (
    <Layout
      badge="Today"
      title="Today"
      description="Review today's orders, tasks, and operational highlights in one focused view."
    >
      <div className="page-panel">
        <h2>Today's Task Flow</h2>
        <p>Monitor the most important orders and activity for today.</p>
        <div style={{ marginTop: 18 }}>
          <OrdersTable />
        </div>
      </div>
    </Layout>
  );
}

export default Today;
