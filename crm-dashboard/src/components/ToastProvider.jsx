import { createContext, useCallback, useContext, useState } from "react";
import "../styles/Toast.css";

const ToastContext = createContext(() => {});

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const showToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToast({ id, message, type });
    window.setTimeout(() => setToast((current) => current?.id === id ? null : current), 4000);
  }, []);

  return <ToastContext.Provider value={showToast}>{children}
    {toast && <div className={`toast toast--${toast.type}`} role="status"><span>{toast.message}</span><button onClick={() => setToast(null)} aria-label="Dismiss message">×</button></div>}
  </ToastContext.Provider>;
}

export function useToast() { return useContext(ToastContext); }
