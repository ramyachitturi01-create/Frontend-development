import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../styles/SalesTable.css";
import { getOrders } from "../lib/localStore";

export default function OrdersTable() {
  const [searchParams] = useSearchParams();
  const globalQuery = searchParams.get("search") || "";
  const [query, setQuery] = useState(globalQuery);
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState(1);
  const [selected, setSelected] = useState(null);

  const [dataState, setDataState] = useState([]);

  useEffect(() => {
    setDataState(getOrders());
  }, []);

  useEffect(() => {
    setQuery(globalQuery);
    setPage(1);
  }, [globalQuery]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let base = dataState.slice();
    if (status !== "All") base = base.filter((r) => r.status === status);
    if (q) base = base.filter((r) => r.id.toLowerCase().includes(q) || r.customer.toLowerCase().includes(q));
    if (!sortKey) return base;
    return [...base].sort((a, b) => {
      const A = a[sortKey];
      const B = b[sortKey];
      if (typeof A === "number" && typeof B === "number") return (A - B) * sortDir;
      return String(A).localeCompare(String(B)) * sortDir;
    });
  }, [dataState, query, status, sortKey, sortDir]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, pageCount);
  const paged = filtered.slice((current - 1) * pageSize, current * pageSize);

  function toggleSort(key) {
    if (sortKey === key) setSortDir((s) => -s);
    else { setSortKey(key); setSortDir(1); }
  }

  function exportRow(row) {
    const csv = `Order ID,Date,Customer,Amount,Status\n${row.id},${row.date},${row.customer},${row.amount},${row.status}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${row.id}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  const navigate = useNavigate();

  return (
    <div className="sales-table">
      <div className="sales-table__controls">
        <input
          className="sales-table__input"
          placeholder="Search orders or customers"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(1); }}
        />

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
            <option>All</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Refunded</option>
            <option>Cancelled</option>
          </select>

          <label className="sales-table__rows-label">
            <span>Rows</span>
            <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </label>
        </div>
      </div>

      <table className="sales-table__grid">
        <thead>
          <tr>
            <th onClick={() => toggleSort("date")} style={{ cursor: "pointer" }}>Date {sortKey === "date" ? (sortDir === 1 ? "▲" : "▼") : ""}</th>
            <th onClick={() => toggleSort("id")} style={{ cursor: "pointer" }}>Order ID {sortKey === "id" ? (sortDir === 1 ? "▲" : "▼") : ""}</th>
            <th onClick={() => toggleSort("customer")} style={{ cursor: "pointer" }}>Customer {sortKey === "customer" ? (sortDir === 1 ? "▲" : "▼") : ""}</th>
            <th onClick={() => toggleSort("amount")} style={{ cursor: "pointer", textAlign: "right" }}>Amount {sortKey === "amount" ? (sortDir === 1 ? "▲" : "▼") : ""}</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paged.length === 0 ? (
            <tr><td colSpan={6} className="sales-table__empty">No orders</td></tr>
          ) : (
            paged.map((r) => (
              <tr key={r.id}>
                <td>{r.date}</td>
                <td><a href="#">{r.id}</a></td>
                <td>{r.customer}</td>
                <td style={{ textAlign: "right" }}>${Number(r.amount).toFixed(2)}</td>
                <td className={`status-${r.status.toLowerCase()}`}>{r.status}</td>
                <td>
                  <button className="action-button" onClick={() => navigate(`/orders/${r.id}`)}>Details</button>
                  <button className="action-button" onClick={() => navigate(`/orders/${r.id}?edit=1`)}>Edit</button>
                  <button className="action-button action-button--primary" onClick={() => exportRow(r)}>Export</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="sales-table__pagination">
        <div className="sales-table__pagination-summary">Showing {(current - 1) * pageSize + 1} - {Math.min(current * pageSize, filtered.length)} of {filtered.length}</div>
        <div className="sales-table__pagination-actions">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={current === 1}>Prev</button>
          <button onClick={() => setPage((p) => Math.min(pageCount, p + 1))} disabled={current === pageCount}>Next</button>
        </div>
      </div>

      {selected && (
        <div className="sales-table__overlay">
          <div className="sales-table__modal">
            <h3>Order {selected.id}</h3>
            <p><strong>Date:</strong> {selected.date}</p>
            <p><strong>Customer:</strong> {selected.customer}</p>
            <p><strong>Amount:</strong> ${Number(selected.amount).toFixed(2)}</p>
            <p><strong>Status:</strong> {selected.status}</p>
            <div className="sales-table__modal-actions">
              <button onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
