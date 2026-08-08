import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { getOrders, saveOrder } from "../lib/localStore";
import { useToast } from "../components/ToastProvider";

const today = new Date().toISOString().slice(0, 10);

export default function NewOrder() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ customer: "", amount: "", status: "Pending", date: today });
  const [error, setError] = useState("");
  const showToast = useToast();
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  function handleSubmit(event) {
    event.preventDefault();
    const amount = Number(form.amount);
    if (!form.customer.trim() || !Number.isFinite(amount) || amount <= 0) { setError("Enter a customer name and an amount greater than zero."); return; }
    const latestNumber = getOrders().reduce((highest, order) => Math.max(highest, Number(order.id.replace(/\D/g, "")) || 0), 1000);
    const order = { ...form, id: `ORD-${latestNumber + 1}`, customer: form.customer.trim(), amount };
    saveOrder(order);
    showToast(`Order ${order.id} created successfully.`);
    navigate(`/orders/${order.id}`);
  }

  return <Layout badge="Orders" title="New order" description="Create a customer order and keep it in your order records.">
    <div className="page-panel form-panel"><form onSubmit={handleSubmit} className="order-form">
      <label>Customer name<input required value={form.customer} onChange={(e) => update("customer", e.target.value)} placeholder="e.g. Acme Corp" /></label>
      <label>Order amount<input required min="0.01" step="0.01" type="number" value={form.amount} onChange={(e) => update("amount", e.target.value)} placeholder="0.00" /></label>
      <label>Order date<input required type="date" value={form.date} onChange={(e) => update("date", e.target.value)} /></label>
      <label>Status<select value={form.status} onChange={(e) => update("status", e.target.value)}><option>Pending</option><option>Paid</option><option>Refunded</option></select></label>
      {error && <p className="form-error">{error}</p>}
      <div className="form-actions"><button className="primary-btn" type="submit">Create order</button><button className="secondary-btn" type="button" onClick={() => navigate("/orders")}>Cancel</button></div>
    </form></div>
  </Layout>;
}
