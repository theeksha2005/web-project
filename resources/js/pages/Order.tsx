import React from 'react';
import OrderForm from '../components/OrderForm';

export default function Order() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Place your Order</h1>
      <OrderForm />
    </div>
  );
}

