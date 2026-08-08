import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Customer from "./pages/Customer";
import Orders from "./pages/Orders";
import Today from "./pages/Today";
import Analytics from "./pages/Analytics";
import Data from "./pages/Data";
import Settings from "./pages/Settings";
import OrderDetail from "./pages/OrderDetail";
import CustomerDetail from "./pages/CustomerDetail";
import NewOrder from "./pages/NewOrder";
import { ToastProvider } from "./components/ToastProvider";

function App() {
  useEffect(() => {
    try { document.documentElement.dataset.theme = JSON.parse(localStorage.getItem("crm_settings"))?.theme || "light"; } catch { document.documentElement.dataset.theme = "light"; }
  }, []);

  return (
    <ToastProvider><BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/customers" element={<Customer />} />
        <Route path="/personnel" element={<Navigate to="/customers" replace />} />
        <Route path="/customers/:name" element={<CustomerDetail />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/new" element={<NewOrder />} />
        <Route path="/today" element={<Today />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/data" element={<Data />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter></ToastProvider>
  );
}

export default App;
