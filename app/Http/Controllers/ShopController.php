<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Cart; // optional, if you have a Cart model


class ShopController extends Controller
{
     public function index(Request $request)
    {
        $products = Product::all(); // or paginate if many

        // Optional: get user's cart from DB
        $cart = []; // replace with actual cart fetch logic if you have Cart model

        return Inertia::render('Shop', [
            'products' => $products->map(fn($p) => [
                'id' => $p->id,
                'name' => $p->name,
                'price' => $p->price, // use LKR here
                'stock' => $p->stock ?? null,
                'selected_size'=>$i->selected_size,
                'quantity'=>$i->quantity,
            ]),
            'cart' => $cart, // pass cart items here
        ]);
    }

}
