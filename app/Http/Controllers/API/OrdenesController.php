<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;

class OrdenesController extends Controller
{
    public function store(Request $request)
    {
        // Validar el payload de la solicitud
        $request->validate([
            'fecha_orden' => 'required|date',
            'cliente' => 'required|string',
            'items' => 'required|array',
            'totalOrden' => 'required|numeric',
        ]);

        // Crear la orden
        $order = Order::create([
            'fecha_orden' => $request->fecha_orden,
            'cliente' => $request->cliente,
            'totalOrden' => $request->totalOrden,
        ]);

        // Crear los items asociados y descontar el stock de los productos
        foreach ($request->items as $item) {
            $orderItem = OrderItem::create([
                'order_id' => $order->id, // Asignar el ID de la orden
                'nombre' => $item['nombre'],
                'referencia' => $item['referencia'],
                'precio' => $item['precio'],
                'peso' => $item['peso'],
                'categoria' => $item['categoria'],
                'cnt' => $item['cnt'], // Utilizamos el campo cnt para la cantidad
            ]);

            // Descontar la cantidad del stock del producto
            $product = Product::find($item['id']);
            
            
            if ($product) {
                $product->stock -= $item['cnt'];
                $product->save();
            }
        }

        // Respuesta de éxito
        return response()->json(['message' => 'Orden creada exitosamente'], 201);
    }

}
