import React, { useEffect, useState } from "react";
import { useToast } from "./ToastProvider";

export default function SettingsForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const showToast = useToast();

  useEffect(() => {
    try {
      const raw = localStorage.getItem("crm_settings");
      if (raw) {
        const s = JSON.parse(raw);
        setName(s.name || "");
        setEmail(s.email || "");
        setTheme(s.theme || "light");
        setNotifications(typeof s.notifications === "boolean" ? s.notifications : true);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function handleSave(e) {
    e.preventDefault();
    const payload = { name, email, theme, notifications };
    localStorage.setItem("crm_settings", JSON.stringify(payload));
    showToast("Settings saved successfully.");
  }

  return (
    <form onSubmit={handleSave} style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "grid", gap: 6 }}>
        <label style={{ fontSize: 13, color: "var(--muted)" }}>Full name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label style={{ fontSize: 13, color: "var(--muted)" }}>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ display: "grid", gap: 6 }}>
          <label style={{ fontSize: 13, color: "var(--muted)" }}>Theme</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          <label style={{ fontSize: 13, color: "var(--muted)" }}>Notifications</label>
          <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input type="checkbox" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />
            <span style={{ color: "var(--text-strong)" }}>{notifications ? "Enabled" : "Disabled"}</span>
          </label>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit" className="primary-btn">Save settings</button>
        <button type="button" className="secondary-btn" onClick={() => {
          try { localStorage.removeItem("crm_settings"); } catch (e) {}
          setName(""); setEmail(""); setTheme("light"); setNotifications(true);
          showToast("Settings reset to light theme.");
        }}>Reset</button>
      </div>
    </form>
  );
}
