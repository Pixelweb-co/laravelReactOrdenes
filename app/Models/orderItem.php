<?php 
// app/Models/OrderItem.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $fillable = ['order_id', 'nombre', 'referencia', 'precio', 'peso', 'categoria', 'cnt'];

    // Relación muchos a uno con Order
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}

?>