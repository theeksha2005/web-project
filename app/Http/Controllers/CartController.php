<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\AddCartItemRequest;
use App\Http\Requests\UpdateCartItemRequest;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    /**
     * Get the current user's cart or session cart with enhanced error handling
     */
    private function getCart(Request $request)
    {
        try {
            if (auth()->check()) {
                Log::info('Fetching cart for authenticated user', ['user_id' => auth()->id()]);
                $cart = Cart::firstOrCreate(
                    ['user_id' => auth()->id()],
                    ['session_id' => null]
                );
            } else {
                $sessionId = $request->session()->getId();
                if (!$sessionId) {
                    Log::warning('Session ID was missing, starting new session');
                    $request->session()->start();
                    $sessionId = $request->session()->getId();
                }

                Log::info('Fetching cart for guest session', ['session_id' => $sessionId]);
                $cart = Cart::firstOrCreate(
                    ['session_id' => $sessionId],
                    ['user_id' => null]
                );
            }

            // Load relationships to avoid N+1 queries
            return $cart->load('items.product');
            
        } catch (\Exception $e) {
            Log::error('Error retrieving cart: ' . $e->getMessage(), [
                'exception' => $e,
                'user_id' => auth()->check() ? auth()->id() : 'guest',
                'session_id' => $request->session()->getId()
            ]);
            return null;
        }
    }
    // Add this method to your CartController
 public function index(Request $request)
 {
    try {
        $cart = $this->getCart($request);
        
        if (!$cart) {
            return response()->json([
                'success' => false,
                'error' => 'Could not retrieve cart'
            ], 500);
        }
        
        return response()->json([
            'success' => true,
            'cart' => $cart
        ]);
    } catch (\Exception $e) {
        Log::error('Cart index error: ' . $e->getMessage());
        
        return response()->json([
            'success' => false,
            'error' => 'Failed to retrieve cart'
        ], 500);
    }
 }

    /**
     * Add item to cart with transaction and enhanced error handling
     */
    public function store(AddCartItemRequest $request)
    {
        \Log::info('API Cart store request', [
        'url' => $request->fullUrl(),
        'data' => $request->all(),
        'headers' => $request->headers->all(),
        'session_id' => $request->session()->getId(),
        'user' => auth()->check() ? auth()->id() : 'guest',
        'ip' => $request->ip(),
        'auth_check' => auth()->check(),
        'auth_user' => auth()->check() ? auth()->user() : null
    ]);
    
        
        try {
            Log::info('Attempting to add item to cart', $request->all());
            
            $cart = $this->getCart($request);
            
            if (!$cart) {
                Log::error('Cart could not be retrieved or created');
                return response()->json([
                    'success' => false,
                    'error' => 'Could not find or create cart'
                ], 500);
            }

            $product = Product::find($request->product_id);
            
            if (!$product) {
                Log::error('Product not found', ['product_id' => $request->product_id]);
                DB::rollBack();
                return response()->json([
                    'success' => false,
                    'error' => 'Product not found'
                ], 404);
            }

            // Check stock availability
            if ($product->stock < $request->quantity) {
                Log::warning('Insufficient stock', [
                    'product_id' => $product->id,
                    'requested_quantity' => $request->quantity,
                    'available_stock' => $product->stock
                ]);
                DB::rollBack();
                return response()->json([
                    'success' => false,
                    'error' => 'Not enough stock available'
                ], 422);
            }

            $size = null;
            $productName = strtolower($product->name);
            if ((str_contains($productName, 't-shirt') || 
                 str_contains($productName, 'tshirt') ||
                 str_contains($productName, 't shirt')) && 
                $request->has('selected_size')) {
                $size = $request->selected_size;
                
                // Validate size if needed for your application
                $validSizes = ['small', 'medium', 'large', 'x-large'];
                if (!in_array(strtolower($size), $validSizes)) {
                    Log::warning('Invalid size selected', ['size' => $size]);
                    DB::rollBack();
                    return response()->json([
                        'success' => false,
                        'error' => 'Invalid size selected'
                    ], 422);
                }
            }

            // Check if item already exists in cart
            $existingItem = $cart->items()->where([
                'product_id' => $product->id,
                'selected_size' => $size
            ])->first();

            if ($existingItem) {
                // Update quantity if item exists
                $newQuantity = $existingItem->quantity + $request->quantity;
                
                if ($product->stock < $newQuantity) {
                    Log::warning('Not enough stock for additional quantity', [
                        'product_id' => $product->id,
                        'existing_quantity' => $existingItem->quantity,
                        'additional_quantity' => $request->quantity,
                        'available_stock' => $product->stock
                    ]);
                    DB::rollBack();
                    return response()->json([
                        'success' => false,
                        'error' => 'Not enough stock for the additional quantity'
                    ], 422);
                }
                
                $existingItem->update(['quantity' => $newQuantity]);
                $cartItem = $existingItem;
                Log::info('Updated existing cart item', [
                    'cart_item_id' => $cartItem->id,
                    'new_quantity' => $newQuantity
                ]);
            } else {
                // Create new cart item
                $cartItem = CartItem::create([
                    'cart_id' => $cart->id,
                    'product_id' => $product->id,
                    'quantity' => $request->quantity,
                    'selected_size' => $size,
                    'price' => $product->price // Store price at time of addition
                ]);
                Log::info('Created new cart item', ['cart_item_id' => $cartItem->id]);
            }

            // Refresh cart with relationships
            $cart->load('items.product');
            
            DB::commit();
            
            Log::info('Item successfully added to cart', [
                'cart_id' => $cart->id,
                'cart_item_id' => $cartItem->id,
                'product_id' => $product->id
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Item added to cart successfully',
                'cart' => $cart,
                'item' => $cartItem
            ]);

        } catch (\Exception $e) {
            
            
            Log::error('Cart store error: ' . $e->getMessage(), [
                'exception' => $e,
                'trace' => $e->getTraceAsString(),
                
            ]);
            
            return response()->json([
                'success' => false,
                'error' => 'Failed to add item to cart. Please try again.'
            ], 500);
        }
    }

    /**
     * Update cart item quantity with enhanced error handling
     */
    public function update(UpdateCartItemRequest $request, CartItem $item)
    {
        DB::beginTransaction();
        
        try {
            Log::info('Attempting to update cart item', [
                'cart_item_id' => $item->id,
                'new_quantity' => $request->quantity
            ]);
            
            $cart = $this->getCart($request);

            if ($item->cart_id !== $cart->id) {
                Log::warning('Cart item does not belong to current cart', [
                    'item_cart_id' => $item->cart_id,
                    'current_cart_id' => $cart->id
                ]);
                DB::rollBack();
                return response()->json([
                    'error' => 'Forbidden'
                ], 403);
            }

            $product = $item->product;
            if (isset($product->stock) && $request->quantity > $product->stock) {
                Log::warning('Not enough stock for update', [
                    'product_id' => $product->id,
                    'requested_quantity' => $request->quantity,
                    'available_stock' => $product->stock
                ]);
                DB::rollBack();
                return response()->json(['error' => 'Not enough stock'], 422);
            }

            $item->update(['quantity' => $request->quantity]);
            
            DB::commit();
            
            Log::info('Cart item updated successfully', [
                'cart_item_id' => $item->id,
                'new_quantity' => $request->quantity
            ]);

            return response()->json([
                'success' => true,
                'item' => $item->load('product')
            ]);
            
        } catch (\Exception $e) {
            DB::rollBack();
            
            Log::error('Cart update error: ' . $e->getMessage(), [
                'exception' => $e,
                'cart_item_id' => $item->id,
                'request' => $request->all()
            ]);
            
            return response()->json([
                'success' => false,
                'error' => 'Failed to update cart item. Please try again.'
            ], 500);
        }
    }

    /**
     * Remove item from cart with enhanced error handling
     */
    public function destroy(Request $request, CartItem $item)
    {
        DB::beginTransaction();
        
        try {
            Log::info('Attempting to remove cart item', ['cart_item_id' => $item->id]);
            
            $cart = $this->getCart($request);

            if ($item->cart_id !== $cart->id) {
                Log::warning('Cart item does not belong to current cart', [
                    'item_cart_id' => $item->cart_id,
                    'current_cart_id' => $cart->id
                ]);
                DB::rollBack();
                return response()->json([
                    'error' => 'Forbidden'
                ], 403);
            }

            $item->delete();
            
            DB::commit();
            
            Log::info('Cart item removed successfully', ['cart_item_id' => $item->id]);

            return response()->json([
                'success' => true,
                'message' => 'Item removed from cart'
            ]);
            
        } catch (\Exception $e) {
            DB::rollBack();
            
            Log::error('Cart item deletion error: ' . $e->getMessage(), [
                'exception' => $e,
                'cart_item_id' => $item->id
            ]);
            
            return response()->json([
                'success' => false,
                'error' => 'Failed to remove item from cart. Please try again.'
            ], 500);
        }
    }
    
    /**
     * Get cart contents with enhanced error handling
     */
    public function show(Request $request)
    {
        try {
            $cart = $this->getCart($request);
            
            if (!$cart) {
                Log::error('Cart could not be retrieved for display');
                return response()->json([
                    'success' => false,
                    'error' => 'Could not retrieve cart'
                ], 500);
            }
            
            Log::debug('Cart retrieved successfully', [
                'cart_id' => $cart->id,
                'item_count' => $cart->items->count()
            ]);
            
            return response()->json([
                'success' => true,
                'cart' => $cart
            ]);
            
        } catch (\Exception $e) {
            Log::error('Cart show error: ' . $e->getMessage(), [
                'exception' => $e,
                'user_id' => auth()->check() ? auth()->id() : 'guest'
            ]);
            
            return response()->json([
                'success' => false,
                'error' => 'Failed to retrieve cart. Please try again.'
            ], 500);
        }
    }
}