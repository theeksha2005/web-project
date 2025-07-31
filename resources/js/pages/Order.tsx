import React, { useEffect } from 'react';
import OrderForm from '../components/OrderForm';
import { usePage } from '@inertiajs/react';  // 
import toast from 'react-hot-toast';

export default function Order() {

   const { props } = usePage();

  useEffect(() => {
    if (props.success) {
      toast.success(props.success as string);
    }
  }, [props.success]);
  return (
     <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Place your Order</h1>
      <OrderForm />
    </div>
  );
}

