import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ badge, title, description, children, headerRight, compact = false }) {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Navbar />
        <main className={`dashboard-content ${compact ? "dashboard-content--compact" : ""}`}>
          {!compact && <div className="dashboard-header">
            <div className="dashboard-hero">
              {badge && <span className="dashboard-badge">{badge}</span>}
              <h1>{title}</h1>
              {description && <p className="dashboard-description">{description}</p>}
            </div>
            <div className="dashboard-header-controls">{headerRight}</div>
          </div>}
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
