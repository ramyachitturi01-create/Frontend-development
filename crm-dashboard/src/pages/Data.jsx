import Layout from "../components/Layout";
import OrdersTable from "../components/OrdersTable";
import { getOrders } from "../lib/localStore";

const orders = getOrders();
const totalValue = orders.reduce((sum, order) => sum + Number(order.amount || 0), 0);
const paidOrders = orders.filter((order) => order.status === "Paid").length;

function Data() {
  return (
    <Layout
      badge="Data"
      title="Order data"
      description="Review the source records behind your dashboard and sales reports."
    >
      <div className="data-summary">
        <div><span>Records</span><strong>{orders.length}</strong></div>
        <div><span>Paid orders</span><strong>{paidOrders}</strong></div>
        <div><span>Order value</span><strong>${totalValue.toLocaleString()}</strong></div>
      </div>
      <div className="page-panel">
        <h2>Order records</h2>
        <p>Search, filter, export, or open an individual customer order.</p>
        <div style={{ marginTop: 18 }}><OrdersTable /></div>
      </div>
    </Layout>
  );
}

export default Data;
