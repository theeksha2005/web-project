<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\CheckoutRequest;

class CheckoutController extends Controller
{
    public function create(CheckoutRequest $request)
  {
    $cart = $this->getCart($request);
    $cart->load('items.product');

    if ($cart->items->isEmpty()) {
        return back()->withErrors(['cart'=>'Cart is empty']);
    }

    DB::transaction(function() use ($cart, $request, &$order) {
        $subtotal = 0;
        foreach ($cart->items as $ci) {
            $product = $ci->product;
            $priceCents = $product->price_cents ?? (int)round($product->price * 100);
            if (isset($product->stock) && $ci->quantity > $product->stock) {
                throw ValidationException::withMessages(['stock'=>'Insufficient stock for '.$product->name]);
            } 
                      $subtotal += $priceCents * $ci->quantity;
        }

        $shipping = 0; // compute if needed
        $total = $subtotal + $shipping;

        $order = Order::create([
            'user_id' => auth()->id(),
            'status' => 'pending',
            'subtotal_cents' => $subtotal,
            'shipping_cents' => $shipping,
            'total_cents' => $total,
            'shipping_address' => [
                'full_name' => $request->full_name,
                'address' => $request->address,
                'city' => $request->city,
                'postal_code' => $request->postal_code ?? null,
                'phone' => $request->phone,
            ]
        ]);
        foreach ($cart->items as $ci) {
            $product = $ci->product;
            $priceCents = $product->price_cents ?? (int)round($product->price * 100);
            $order->items()->create([
                'product_id' => $product->id,
                'name_snapshot' => $product->name,
                'price_cents_snapshot' => $priceCents,
                'quantity' => $ci->quantity,
                'selected_size' => $ci->selected_size,
            ]);

            if (isset($product->stock)) {
                $product->decrement('stock', $ci->quantity);
            }
        }

        // clear cart
        $cart->items()->delete();
    });

return redirect()->route('orders.show', $order->id)->with('success','Order placed');

  }
}