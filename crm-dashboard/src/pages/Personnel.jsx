import Layout from "../components/Layout";
import CustomersTable from "../components/CustomersTable";

function Personnel() {
  return (
    <Layout
      badge="Personnel"
      title="Personnel"
      description="Manage employee records, view personnel details, and keep your team information up to date."
    >
      <div className="page-panel">
        <h2>Personnel Overview</h2>
        <p>Browse and manage your active workforce quickly.</p>
        <div style={{ marginTop: 18 }}>
          <CustomersTable />
        </div>
      </div>
    </Layout>
  );
}

export default Personnel;
