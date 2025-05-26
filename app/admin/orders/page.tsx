'use client';

const mockOrders = [
  {
    id: 'ORD12345',
    customer: 'Brian Nyakundi',
    status: 'Processing',
    total: 'KES 22,799',
  },
  {
    id: 'ORD12346',
    customer: 'Eva M.',
    status: 'Shipped',
    total: 'KES 6,500',
  },
];

export default function OrdersPage() {
  return (
    <div>
      <h1 className="text-gray-800 text-2xl font-bold mb-6">Orders</h1>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Order ID</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Customer</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Total</th>
              <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="px-6 py-4 text-sm text-gray-800">{order.id}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{order.customer}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{order.status}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{order.total}</td>
                <td className="px-6 py-4 text-sm text-right">
                  <button className="text-sm text-blue-600 hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
