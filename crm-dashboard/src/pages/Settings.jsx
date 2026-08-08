import Layout from "../components/Layout";
import SettingsForm from "../components/SettingsForm";

function Settings() {
  return (
    <Layout
      badge="Settings"
      title="Settings"
      description="Configure application preferences, user settings, and system options from one place."
    >
      <div className="page-panel">
        <h2>Settings</h2>
        <p>Manage your profile, preferences, and notification settings.</p>
        <div style={{ marginTop: 18 }}>
          <SettingsForm />
        </div>
      </div>
    </Layout>
  );
}

export default Settings;
