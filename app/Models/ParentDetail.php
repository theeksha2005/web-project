<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ParentDetail extends Model
{
    protected $table = 'parent';

    protected $fillable = [
        'user_id', 'full_name'
    ];
}
