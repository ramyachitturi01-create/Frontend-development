import React, { useMemo, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import { saveOrder, getOrder, cancelOrder } from "../lib/localStore";
import { useToast } from "../components/ToastProvider";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const query = useQuery();
  const editMode = query.get("edit") === "1";

  const order = useMemo(() => getOrder(id), [id]);
  const [form, setForm] = useState(order || {});
  const [confirmCancel, setConfirmCancel] = useState(false);
  const showToast = useToast();

  if (!order) {
    return (
      <Layout badge="Orders" title="Order not found" description={"The requested order was not found."}>
        <div className="page-panel">
          <p>Order {id} not found.</p>
          <button className="secondary-btn" onClick={() => navigate(-1)}>Back</button>
        </div>
      </Layout>
    );
  }

  function handleSave(e) {
    e.preventDefault();
    saveOrder(form);
    showToast(`Order ${form.id} updated successfully.`);
    navigate(-1);
  }

  function handleCancel() {
    cancelOrder(order.id);
    setConfirmCancel(false);
    showToast(`Order ${order.id} was cancelled.`);
    navigate("/orders");
  }

  return (
    <Layout badge="Orders" title={`Order ${order.id}`} description={`Details for ${order.customer}`}>
      <div className="page-panel">
        {editMode ? (
          <form onSubmit={handleSave} style={{ display: "grid", gap: 12 }}>
            <label>
              Amount
              <input value={form.amount} onChange={(e) => setForm((s) => ({ ...s, amount: e.target.value }))} />
            </label>
            <label>
              Status
              <select value={form.status} onChange={(e) => setForm((s) => ({ ...s, status: e.target.value }))}>
                <option>Paid</option>
                <option>Pending</option>
                <option>Refunded</option>
              </select>
            </label>
            <div style={{ display: "flex", gap: 8 }}>
              <button type="submit" className="primary-btn">Save</button>
              <button type="button" className="secondary-btn" onClick={() => navigate(-1)}>Cancel</button>
            </div>
          </form>
        ) : (
          <div>
            <p><strong>Date:</strong> {order.date}</p>
            <p><strong>Customer:</strong> {order.customer}</p>
            <p><strong>Amount:</strong> ${Number(order.amount).toFixed(2)}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <div style={{ marginTop: 12 }}>
              <button className="secondary-btn" onClick={() => navigate(-1)}>Back</button>
              <button style={{ marginLeft: 8 }} className="primary-btn" onClick={() => navigate(`/orders/${order.id}?edit=1`)}>Edit</button>
              {order.status !== "Cancelled" && <button style={{ marginLeft: 8 }} className="danger-btn" onClick={() => setConfirmCancel(true)}>Cancel order</button>}
            </div>
          </div>
        )}
      </div>
      {confirmCancel && <div className="confirm-overlay" role="dialog" aria-modal="true" aria-labelledby="cancel-order-title"><div className="confirm-dialog"><h2 id="cancel-order-title">Cancel this order?</h2><p>This will mark {order.id} as cancelled. You can keep its history for reporting.</p><div><button className="secondary-btn" onClick={() => setConfirmCancel(false)}>Keep order</button><button className="danger-btn" onClick={handleCancel}>Cancel order</button></div></div></div>}
    </Layout>
  );
}
