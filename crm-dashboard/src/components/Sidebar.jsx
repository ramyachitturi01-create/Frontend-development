import { NavLink, Link } from "react-router-dom";
import "../styles/Sidebar.css";
import {
  FaTachometerAlt,
  FaUsers,
  FaShoppingCart,
  FaChartBar,
  FaCog,
  FaDatabase,
} from "react-icons/fa";

const navItems = [
  { to: "/", icon: FaTachometerAlt, label: "Dashboard" },
  { to: "/orders", icon: FaShoppingCart, label: "Orders" },
  { to: "/customers", icon: FaUsers, label: "Customers" },
  { to: "/analytics", icon: FaChartBar, label: "Analytics" },
  { to: "/data", icon: FaDatabase, label: "Data" },
  { to: "/settings", icon: FaCog, label: "Settings" },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar__brand">
          <h2 className="logo">CRM</h2>
          <span className="sidebar__version">v1.0</span>
        </div>

        <nav>
          <ul>
            {navItems.map(({ to, icon: Icon, label }) => (
              <li key={label}>
                <NavLink
                  to={to}
                  className={({ isActive }) => (isActive ? "sidebar-link active" : "sidebar-link")}
                >
                  <Icon />
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar__actions">
          <Link to="/orders/new" className="cta cta--add">New order</Link>
          <Link to="/customers" className="cta cta--secondary">View customers</Link>
        </div>
      </div>

      <div className="sidebar__footer">
        <button className="sidebar-link sidebar-link--ghost">Help</button>
        <button className="sidebar-link sidebar-link--ghost">About Project</button>
      </div>
    </aside>
  );
}

export default Sidebar;
