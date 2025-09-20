<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;

    // Fillable fields based on updated table
    protected $fillable = [
        'parent_id',         // user reference
        'total_price',       // total price in LKR
        'status',            // order status
        'shipping_address',  // optional shipping info
    ];

    // Cast shipping_address as array
    protected $casts = [
        'shipping_address' => 'array',
    ];

    // Relationships
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'parent_id');
    }

}
