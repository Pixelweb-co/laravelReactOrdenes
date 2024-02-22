<?php

// app/Models/Order.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['fecha_orden', 'cliente', 'totalOrden'];

    // Relación uno a muchos con OrderItem
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}


?>
