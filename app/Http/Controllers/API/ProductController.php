<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function get(){
        try { 
            $data = Product::get();
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            return response()->json([ 'error' => $th->getMessage()], 500);
        }
    }
    
  
    public function create(Request $request){
        try {

           
            $data['nombre'] = $request['nombre'];
            $data['referencia'] = $request['referencia'];
            $data['precio'] = $request['precio'];
            $data['peso'] = $request['peso'];
            $data['categoria'] = $request['categoria'];
            $data['stock'] = $request['stock'];
            $data['fecha_creacion'] = date('Y-m-d H:i:s');

            $res = Product::create($data);
            return response()->json( $res, 200);
        } catch (\Throwable $th) {
            return response()->json([ 'error' => $th->getMessage()], 500);
        }
    }

    public function getById($id){
        try { 
            $data = Product::find($id);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            return response()->json([ 'error' => $th->getMessage()], 500);
        }
    }

    public function search($term){
        try { 
            $data = Product::find($term);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            return response()->json([ 'error' => $th->getMessage()], 500);
        }
    }


    public function update(Request $request,$id){
        try { 
            
            $data['nombre'] = $request['nombre'];
            $data['referencia'] = $request['referencia'];
            $data['precio'] = $request['precio'];
            $data['peso'] = $request['peso'];
            $data['categoria'] = $request['categoria'];
            $data['stock'] = $request['stock'];

            Product::find($id)->update($data);
            $res = Product::find($id);
            return response()->json( $res , 200);
        } catch (\Throwable $th) {
            return response()->json([ 'error' => $th->getMessage()], 500);
        }
    }
  
    public function delete($id){
        try {       
            $res = Product::find($id)->delete(); 
            return response()->json([ "deleted" => $res ], 200);
        } catch (\Throwable $th) {
            return response()->json([ 'error' => $th->getMessage()], 500);
        }
    }
}
