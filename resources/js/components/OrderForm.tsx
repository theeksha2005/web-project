import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import toast from 'react-hot-toast';

const OrderForm = () => {
  const [form, setForm] = useState({
    parent_id: '',
    item_name: '',
    quantity: '',
    total_price: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Convert quantity and total_price to numbers
    const formData = {
      ...form,
      quantity: parseInt(form.quantity),
      total_price: parseFloat(form.total_price),
    };

    Inertia.post('/orders', form,  {
      onSuccess: (page) => {
       console.log('Inertia page props:', page.props);
      if (page.props?.success) {
        toast.success(page.props.success as string);
  }
},
 
      onError: () => {
        toast.error('Something went wrong.');
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 bg-white shadow rounded w-full max-w-md mx-auto mt-10">
      <input type="text" name="parent_id" value={form.parent_id} onChange={handleChange} placeholder="Parent ID" className="w-full border p-2 rounded" />
      <input type="text" name="item_name" value={form.item_name} onChange={handleChange} placeholder="Item Name" className="w-full border p-2 rounded" />
      <input type="number" name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" className="w-full border p-2 rounded" />
      <input type="number" name="total_price" value={form.total_price} onChange={handleChange} placeholder="Total Price" className="w-full border p-2 rounded" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit</button>
    </form>
  );
};

export default OrderForm;
