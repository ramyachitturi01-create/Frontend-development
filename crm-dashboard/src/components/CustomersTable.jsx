import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../styles/SalesTable.css";
import { getOrders } from "../lib/localStore";

export default function CustomersTable() {
  const [searchParams] = useSearchParams();
  const globalQuery = searchParams.get("search") || "";
  const [query, setQuery] = useState(globalQuery);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const source = getOrders();
    const map = new Map();
    source.forEach((s) => {
      const name = s.customer;
      const entry = map.get(name) || { name, orders: 0, total: 0, lastDate: s.date };
      entry.orders += 1;
      entry.total += Number(s.amount || 0);
      if (new Date(s.date) > new Date(entry.lastDate)) entry.lastDate = s.date;
      map.set(name, entry);
    });
    setRows(Array.from(map.values()));
  }, []);

  useEffect(() => {
    setQuery(globalQuery);
    setPage(1);
  }, [globalQuery]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? rows.filter((r) => r.name.toLowerCase().includes(q))
      : rows.slice();
  }, [rows, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const startIndex = filtered.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, filtered.length);

  function handlePage(n) {
    setPage(Math.max(1, Math.min(pageCount, n)));
  }

  const navigate = useNavigate();

  function handleView(customer) {
    navigate(`/customers/${encodeURIComponent(customer.name)}`);
  }

  return (
    <div className="sales-table" style={{ overflowX: "auto" }}>
      <div className="sales-table__controls">
        <input
          className="sales-table__input"
          aria-label="Search customers"
          placeholder="Search customers"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(1); }}
        />

        <label className="sales-table__rows-label">
          <span>Rows</span>
          <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
        </label>
      </div>

      <table className="sales-table__grid" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Orders</th>
            <th style={{ textAlign: "right" }}>Total</th>
            <th>Last order</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paged.length === 0 ? (
            <tr>
              <td colSpan={5} className="sales-table__empty">No customers</td>
            </tr>
          ) : (
            paged.map((c) => (
              <tr key={c.name}>
                <td className="sales-table__cell">{c.name}</td>
                <td className="sales-table__cell">{c.orders}</td>
                <td className="sales-table__cell" style={{ textAlign: "right" }}>₹{c.total.toFixed(2)}</td>
                <td className="sales-table__cell">{c.lastDate}</td>
                <td className="sales-table__cell">
                  <button className="action-button" onClick={() => handleView(c)}>View</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="sales-table__pagination">
        <div className="sales-table__pagination-summary">Showing {startIndex} - {endIndex} of {filtered.length}</div>
        <div className="sales-table__pagination-actions">
          <button onClick={() => handlePage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
          <button onClick={() => handlePage(currentPage + 1)} disabled={currentPage === pageCount}>Next</button>
        </div>
      </div>
    </div>
  );
}
