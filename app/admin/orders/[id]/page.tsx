'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const mockOrder = {
  id: 'ORD12345',
  customer: 'Brian Nyakundi',
  items: [
    { name: 'Nike Air Max', quantity: 1, price: 'KES 17,999' },
    { name: 'New Era Cap', quantity: 1, price: 'KES 4,800' },
  ],
  total: 'KES 22,799',
  status: 'Processing',
};

export default function OrderDetailPage() {
  const { id } = useParams();
  const [status, setStatus] = useState(mockOrder.status);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleSave = () => {
    alert(`Order ${id} status updated to: ${status}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Order #{id}</h1>

      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">Customer Info</h2>
        <p className="text-gray-700">{mockOrder.customer}</p>
      </div>

      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Items</h2>
        <ul className="space-y-2">
          {mockOrder.items.map((item, index) => (
            <li key={index} className="text-gray-700">
              {item.quantity} x {item.name} — {item.price}
            </li>
          ))}
        </ul>
        <p className="mt-4 font-bold text-gray-800">Total: {mockOrder.total}</p>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Update Status</h2>
        <select
          value={status}
          onChange={handleStatusChange}
          className="border border-gray-300 px-4 py-2 rounded text-black"
        >
          <option>Processing</option>
          <option>Shipped</option>
          <option>Delivered</option>
        </select>
        <button
          onClick={handleSave}
          className="ml-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-900"
        >
          Save
        </button>
      </div>
    </div>
  );
}
