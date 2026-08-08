import Layout from "../components/Layout";
import OrdersTable from "../components/OrdersTable";
import { Link } from "react-router-dom";

function Orders() {
  return (
    <Layout
      badge="Orders"
      title="Orders"
      description="Track order status, manage shipments, and review sales performance across your recent orders."
    >
      <div className="page-panel">
        <h2>Order Overview</h2>
        <div className="page-panel__heading"><p>Browse, filter and manage orders.</p><Link to="/orders/new" className="primary-btn">New order</Link></div>
        <div style={{ marginTop: 18 }}>
          <OrdersTable />
        </div>
      </div>
    </Layout>
  );
}

export default Orders;
