import React, { useMemo, useState, useEffect } from "react";
import "../styles/SalesTable.css";
import { getOrders } from "../lib/localStore";
import { useNavigate } from "react-router-dom";

export default function SalesTable({ data }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [rows, setRows] = useState(data ?? getOrders());
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState(1);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setRows(data ?? getOrders());
  }, [data]);

  const filtered = useMemo(() => {
    const queryValue = query.trim().toLowerCase();
    const base = queryValue
      ? rows.filter((row) =>
          row.id.toLowerCase().includes(queryValue) ||
          row.customer.toLowerCase().includes(queryValue) ||
          String(row.amount).toLowerCase().includes(queryValue) ||
          row.status.toLowerCase().includes(queryValue)
        )
      : rows.slice();

    if (!sortKey) return base;

    return [...base].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      if (typeof aValue === "number" && typeof bValue === "number") {
        return (aValue - bValue) * sortDir;
      }
      return String(aValue).localeCompare(String(bValue)) * sortDir;
    });
  }, [rows, query, sortKey, sortDir]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const startIndex = filtered.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, filtered.length);

  function handleSort(key) {
    if (sortKey === key) {
      setSortDir((current) => -current);
    } else {
      setSortKey(key);
      setSortDir(1);
    }
  }

  function handlePage(newPage) {
    setPage(Math.max(1, Math.min(pageCount, newPage)));
  }

  function handleDetails(row) {
    setSelectedRow(row);
    setShowDetails(true);
  }

  function handleEdit(row) {
    navigate(`/orders/${row.id}?edit=1`);
  }

  function handleExport(row) {
    const csv = `Order ID,Date,Customer,Amount,Status\n${row.id},${row.date},${row.customer},${row.amount},${row.status}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${row.id}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  return (
    <div className="sales-table" style={{ overflowX: "auto" }}>
      <div className="sales-table__controls">
        <input
          className="sales-table__input"
          aria-label="Search sales"
          placeholder="Search by order, customer, status"
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
            <th onClick={() => handleSort("date")} style={{ cursor: "pointer" }}>
              Date {sortKey === "date" ? (sortDir === 1 ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => handleSort("id")} style={{ cursor: "pointer" }}>
              Order ID {sortKey === "id" ? (sortDir === 1 ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => handleSort("customer")} style={{ cursor: "pointer" }}>
              Customer {sortKey === "customer" ? (sortDir === 1 ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => handleSort("amount")} style={{ textAlign: "right", cursor: "pointer" }}>
              Amount {sortKey === "amount" ? (sortDir === 1 ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => handleSort("status")} style={{ cursor: "pointer" }}>
              Status {sortKey === "status" ? (sortDir === 1 ? "▲" : "▼") : ""}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paged.length === 0 ? (
            <tr>
              <td colSpan={6} className="sales-table__empty">No results</td>
            </tr>
          ) : (
            paged.map((row) => (
              <tr key={row.id}>
                <td className="sales-table__cell sales-table__cell--date">{row.date}</td>
                <td className="sales-table__cell sales-table__cell--order"><a href="#">{row.id}</a></td>
                <td className="sales-table__cell sales-table__cell--customer">{row.customer}</td>
                <td className="sales-table__cell sales-table__cell--amount">${Number(row.amount).toFixed(2)}</td>
                <td className={`sales-table__cell sales-table__cell--status status-${row.status.toLowerCase()}`}>{row.status}</td>
                <td className="sales-table__cell sales-table__cell--actions">
                  <button onClick={() => handleDetails(row)} className="action-button">Details</button>
                  <button onClick={() => handleEdit(row)} className="action-button">Edit</button>
                  <button onClick={() => handleExport(row)} className="action-button action-button--primary">Export</button>
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

      {showDetails && selectedRow && (
        <div className="sales-table__overlay">
          <div className="sales-table__modal">
            <h3>Order {selectedRow.id}</h3>
            <p><strong>Date:</strong> {selectedRow.date}</p>
            <p><strong>Customer:</strong> {selectedRow.customer}</p>
            <p><strong>Amount:</strong> ${Number(selectedRow.amount).toFixed(2)}</p>
            <p><strong>Status:</strong> {selectedRow.status}</p>
            <div className="sales-table__modal-actions">
              <button onClick={() => { setShowDetails(false); setSelectedRow(null); }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
