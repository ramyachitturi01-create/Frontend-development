import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SalesTable from '../SalesTable';

const sample = [
  { id: 'ORD-1001', date: '2026-07-01', customer: 'Acme Corp', amount: 1200.0, status: 'Paid' },
  { id: 'ORD-1002', date: '2026-07-03', customer: 'Beta LLC', amount: 340.5, status: 'Pending' },
  { id: 'ORD-1003', date: '2026-07-05', customer: 'Gamma Co', amount: 89.99, status: 'Refunded' },
  { id: 'ORD-1004', date: '2026-07-06', customer: 'Delta Inc', amount: 450.0, status: 'Paid' },
  { id: 'ORD-1005', date: '2026-07-07', customer: 'Epsilon Ltd', amount: 299.99, status: 'Pending' },
  { id: 'ORD-1006', date: '2026-07-08', customer: 'Zeta PLC', amount: 1200.0, status: 'Paid' },
];

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({ json: () => Promise.resolve(sample) })
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

test('loads and displays rows from API', async () => {
  render(<SalesTable />);

  // loading indicator
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  // wait for rows to render
  await waitFor(() => expect(screen.getByText('ORD-1001')).toBeInTheDocument());
  expect(screen.getByText('Acme Corp')).toBeInTheDocument();
});

test('search filters results', async () => {
  render(<SalesTable />);
  await waitFor(() => expect(screen.getByText('ORD-1001')).toBeInTheDocument());

  const input = screen.getByPlaceholderText(/search by order/i);
  fireEvent.change(input, { target: { value: 'zeta' } });

  expect(screen.queryByText('Acme Corp')).not.toBeInTheDocument();
  expect(screen.getByText('Zeta PLC')).toBeInTheDocument();
});

test('pagination prev/next works', async () => {
  render(<SalesTable />);
  await waitFor(() => expect(screen.getByText('ORD-1001')).toBeInTheDocument());

  // default page size 5 -> should show ORD-1001..ORD-1005
  expect(screen.getByText('ORD-1005')).toBeInTheDocument();
  expect(screen.queryByText('ORD-1006')).not.toBeInTheDocument();

  // click next
  const next = screen.getByText(/next/i);
  fireEvent.click(next);
  await waitFor(() => expect(screen.getByText('ORD-1006')).toBeInTheDocument());
});
