<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kid extends Model
{
    protected $table = 'kid';

    protected $fillable = [
        'user_id', 'parent_id', 'full_name', 'nickname', 'age', 'birth_month'
    ];
}
