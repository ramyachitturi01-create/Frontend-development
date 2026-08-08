import salesData from "../data/sales.json";

const KEY = "crm_orders";

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return salesData.slice();
    return JSON.parse(raw);
  } catch (e) {
    return salesData.slice();
  }
}

function write(arr) {
  try {
    localStorage.setItem(KEY, JSON.stringify(arr));
  } catch (e) {
    // ignore
  }
}

export function getOrders() {
  return read();
}

export function getOrder(id) {
  return read().find((o) => o.id === id);
}

export function saveOrder(order) {
  const arr = read();
  const i = arr.findIndex((o) => o.id === order.id);
  if (i >= 0) arr[i] = { ...arr[i], ...order };
  else arr.push(order);
  write(arr);
  return order;
}

export function cancelOrder(id) {
  const order = getOrder(id);
  if (!order) return null;
  return saveOrder({ ...order, status: "Cancelled" });
}

export function resetOrders() {
  try { localStorage.removeItem(KEY); } catch (e) {}
}
