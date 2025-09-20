import { useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import React from 'react';


export default function CheckoutForm() {
  const { data, setData, post, processing, errors } = useForm({
    full_name:'', address:'', city:'', postal_code:'', phone:'', payment_method:'cod'
  });

function submit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  post('/checkout', {
    preserveState: false,
    onSuccess: () => {
      console.log('Order submitted successfully!');
    },
  });
}
  return (
    <form onSubmit={submit} className="p-4 space-y-4">
      <input value={data.full_name} onChange={e=>setData('full_name', e.target.value)} placeholder="Full name" />
      {/* other inputs */}
      <button disabled={processing}>Place order (Cash on Delivery)</button>
      {errors && <div>{Object.values(errors).join(', ')}</div>}
    </form>
  );
}
