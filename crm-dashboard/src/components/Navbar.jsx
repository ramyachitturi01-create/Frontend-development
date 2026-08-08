import { FaBell, FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../lib/localStore";
import "../styles/Navbar.css";

const searchablePages = [
  { label: "dashboard", path: "/" },
  { label: "orders", path: "/orders" },
  { label: "customers", path: "/customers" },
  { label: "analytics", path: "/analytics" },
  { label: "data", path: "/data" },
  { label: "settings", path: "/settings" },
];

function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const search = query.trim();
    if (!search) {
      navigate("/orders");
      return;
    }

    const normalizedSearch = search.toLowerCase();
    const matchingPage = searchablePages.find((page) =>
      page.label.includes(normalizedSearch) || normalizedSearch.includes(page.label),
    );
    if (matchingPage) {
      navigate(matchingPage.path);
      return;
    }

    const hasCustomerMatch = getOrders().some((order) =>
      order.customer.toLowerCase().includes(normalizedSearch),
    );
    const destination = hasCustomerMatch ? "/customers" : "/orders";
    navigate(`${destination}?search=${encodeURIComponent(search)}`);
  }

  return (
    <div className="navbar">

      <form className="search" onSubmit={handleSubmit} role="search">
        <FaSearch />
        <input
          type="search"
          aria-label="Search orders or customers"
          placeholder="Search..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </form>

      <div className="profile">
        <FaBell className="bell"/>
        <div className="user">
          <h4>Admin</h4>
          <span>Manager</span>
        </div>
      </div>

    </div>
  );
}

export default Navbar;
