import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { getOrders } from "../lib/localStore";

export default function CustomerDetail() {
  const { name } = useParams();
  const navigate = useNavigate();
  const customerName = decodeURIComponent(name || "");
  const orders = useMemo(() => getOrders().filter((order) => order.customer === customerName), [customerName]);
  const total = orders.reduce((sum, order) => sum + Number(order.amount || 0), 0);

  if (!customerName) return <Layout badge="Customers" title="Customer not found"><div className="page-panel"><button className="secondary-btn" onClick={() => navigate(-1)}>Back</button></div></Layout>;

  return <Layout badge="Customers" title={customerName} description={`Orders and details for ${customerName}`}>
    <div className="page-panel">
      <p><strong>Total orders:</strong> {orders.length}</p>
      <p><strong>Total value:</strong> ${total.toFixed(2)}</p>
      <h3 style={{ marginTop: 18, marginBottom: 10 }}>Order history</h3>
      <table className="customer-orders-table"><thead><tr><th>Date</th><th>Order ID</th><th>Amount</th><th>Status</th></tr></thead>
        <tbody>{orders.map((order) => <tr key={order.id}><td>{order.date}</td><td><button className="text-link" onClick={() => navigate(`/orders/${order.id}`)}>{order.id}</button></td><td>${Number(order.amount).toFixed(2)}</td><td className={`status-${order.status.toLowerCase()}`}>{order.status}</td></tr>)}</tbody>
      </table>
      <div style={{ marginTop: 18 }}><button className="secondary-btn" onClick={() => navigate(-1)}>Back</button></div>
    </div>
  </Layout>;
}
