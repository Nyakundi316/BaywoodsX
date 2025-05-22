'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function EditProductPage() {
  const { id } = useParams();
  const [form, setForm] = useState({ name: '', price: '', stock: '' });

  useEffect(() => {
    // Simulated fetch
    setForm({ name: 'Nike Air Max', price: 'KES 17,999', stock: '10' });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Updated product ${id}:\n${JSON.stringify(form, null, 2)}`);
  };

  return (
    <div>
      <h1 className=" text-black text-2xl font-bold mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-300 px-4 py-2 rounded text-black"
          placeholder="Product Name"
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          className="w-full border border-gray-300 px-4 py-2 rounded text-black"
          placeholder="Price"
        />
        <input
          name="stock"
          value={form.stock}
          onChange={handleChange}
          className="w-full border border-gray-300 px-4 py-2 rounded text-black"
          placeholder="Stock"
        />
        <button type="submit" className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900">
          Update Product
        </button>
      </form>
    </div>
  );
}
