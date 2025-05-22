'use client';

const mockInventory = [
  {
    id: '1',
    name: 'Nike Air Max',
    stock: 10,
    threshold: 5,
  },
  {
    id: '2',
    name: 'New Era Cap',
    stock: 2,
    threshold: 5,
  },
  {
    id: '3',
    name: 'Gym Hoodie',
    stock: 15,
    threshold: 5,
  },
];

export default function InventoryPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Inventory Status</h1>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Product</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Stock</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockInventory.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-6 py-4 text-sm text-gray-800">{item.name}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{item.stock}</td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {item.stock <= item.threshold ? (
                    <span className="text-red-500 font-medium">Low Stock</span>
                  ) : (
                    <span className="text-green-600 font-medium">In Stock</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
