import Layout from "../components/Layout";
import CustomersTable from "../components/CustomersTable";

function Customer() {
  return (
    <Layout
      badge="Customers"
      title="Customers"
      description="Manage customer relationships, review active accounts, and view contact details from one place."
    >
      <div className="page-panel">
        <h2>Customer List</h2>
        <p>Browse and search customers derived from recent orders.</p>
        <div style={{ marginTop: 18 }}>
          <CustomersTable />
        </div>
      </div>
    </Layout>
  );
}

export default Customer;
