<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
       public function index(){

        return response()->json(Order::all());
       }

       public function store(Request $request)
{
    $request->validate([
        'parent_id' => 'required|integer',
        'item_name' => 'required|string|max:255',
        'quantity' => 'required|integer|min:1',
        'total_price' => 'required|numeric|min:0',
    ]);

    $order = Order::create($request->all());

    return redirect()->back()->with('success', 'Order placed successfully!');
}

    public function showOrderForm() {
    return Inertia::render('Order'); // this means Order.tsx in pages/
    }
}

