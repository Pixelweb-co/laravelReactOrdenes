import { useForm } from "react-hook-form";
import axios from "axios";
import React, { useEffect, useState,createRef } from 'react'
import env from "react-dotenv";

const form_data = {
  nombre:'',
  stock:'',
  peso:'',
  categoria:'',
  fecha_registro:'',
  precio:0,
  referencia:''
}

export default function CardForm(props) {
  const [product,setProduct] = useState(form_data)
  const [saved,setSaved] = useState(false)  
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Realizar la solicitud Axios a /admin/user
    
    console.log("pid ",props.id);
    
    if(props.id !== '0'){

        axios
          .put(`${process.env.REACT_APP_API_URL}/api/v1/products/${props.id}`, data)
          .then((response) => {
            // Manejar el éxito (puedes redirigir o mostrar un mensaje de éxito)
            console.log("Formulario enviado exitosamente", response.data);
            setSaved(true);

            setTimeout(()=>{
              setSaved(false);
            },3000)

          })
          .catch((error) => {
            // Manejar el error (puedes mostrar un mensaje de error)
            console.error("Error al enviar el formulario", error);
          });
    }else{
      axios.post(`${process.env.REACT_APP_API_URL}/api/v1/products`, data)
          .then((response) => {
          // Manejar el éxito (puedes redirigir o mostrar un mensaje de éxito)
          console.log("Formulario enviado exitosamente", response.data);
          
          setSaved(true);

          
          setTimeout(()=>{
            setSaved(false);
          },3000)
        
          })
          .catch((error) => {
            // Manejar el error (puedes mostrar un mensaje de error)
            console.error("Error al enviar el formulario", error);
          });

    }      
  };

const isObjEmpty = (obj)=> {
    return Object.keys(obj).length === 0;
}


  useEffect(() => {
    
    const loadProduct = (id) => {
      
      axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/products/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log("response data ",response.data.nombre);
        
      if(!isObjEmpty(response.data)){
        setValue('nombre',response.data.nombre)
        setValue('precio',response.data.precio)
        setValue('stock',response.data.stock)
        setValue('categoria',response.data.categoria)
        setValue('fecha_registro',response.data.fecha_registro)
        setValue('peso',response.data.peso)
        setValue('referencia',response.data.referencia)
        
      }  
      
      })
      .catch((error) => {
        console.log(error)
    
      })
 

    }
    
    console.log("product ",props.id)
    if(props.id !== undefined){
      loadProduct(props.id)
    }

  }, [props.id])


  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">{props.id == 0 ? 'Registro de producto' : 'Editar de producto'}</h6>
            <button
              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="submit"
            >
              Guardar información
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              
              {saved && (              
              <div className="py-4 align-center">
              <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-emerald-500">
                    <span className="text-xl inline-block mr-5 align-middle">
                      <i className="fas fa-save pr-4"></i>
                    </span>
                    <span className="inline-block align-middle mr-8">
                      <b className="capitalize">Producto guardado correctamente.</b> 
                    </span>
                    <button className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-4 outline-none focus:outline-none">
                      <span>×</span>
                    </button>
                  </div>
              </div>
              )}
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Información Básica
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="nombre"
                  >
                    Nombre producto
                  </label>
                  <input
                    type="text"
                    defaultValue={product.nombre}
                    className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                      errors.nombre ? "border-red-500" : ""
                    }`}
                    {...register("nombre", { required: "Este campo es obligatorio" })}
                  />
                  {errors.nombre && (
                    <p className="text-red-500 text-xs italic">{errors.nombre.message}</p>
                  )}
                </div>
              </div>
              {/* Repite este patrón para otros campos de entrada */}
            </div>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="referencia"
                  >
                    Referencia producto
                  </label>
                  <input
                    type="text"
                    defaultValue={product.referencia}
                    className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                      errors.referencia ? "border-red-500" : ""
                    }`}
                    {...register("referencia", { required: "Este campo es obligatorio" })}
                  />
                  {errors.referencia && (
                    <p className="text-red-500 text-xs italic">{errors.referencia.message}</p>
                  )}
                </div>
              </div>
              {/* Repite este patrón para otros campos de entrada */}
            </div>        

            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="precio"
                  >
                    Precio venta
                  </label>
                  <input
                    type="text"
                    defaultValue={product.precio}
                    className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                      errors.precio ? "border-red-500" : ""
                    }`}
                    {...register("precio", { required: "Este campo es obligatorio" })}
                  />
                  {errors.precio && (
                    <p className="text-red-500 text-xs italic">{errors.precio.message}</p>
                  )}
                </div>
              </div>
              {/* Repite este patrón para otros campos de entrada */}
            </div>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="stock"
                  >
                    Stock
                  </label>
                  <input
                    type="text"
                    defaultValue={product.stock}
                    className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                      errors.stock ? "border-red-500" : ""
                    }`}
                    {...register("stock", { required: "Este campo es obligatorio" })}
                  />
                  {errors.stock && (
                    <p className="text-red-500 text-xs italic">{errors.stock.message}</p>
                  )}
                </div>
              </div>
              {/* Repite este patrón para otros campos de entrada */}
            </div>

            
            
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="peso"
                  >
                    Peso
                  </label>
                  <input
                    type="text"
                    defaultValue={product.peso}
                    className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                      errors.age ? "border-red-500" : ""
                    }`}
                    {...register("peso", { required: "Este campo es obligatorio" })}
                  />
                  {errors.peso && (
                    <p className="text-red-500 text-xs italic">{errors.peso.message}</p>
                  )}
                </div>
              </div>
              {/* Repite este patrón para otros campos de entrada */}
            </div>
            

            
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="username"
                  >
                    Categoria
                  </label>
                  
                  <select
                  className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                    errors.categoria ? "border-red-500" : ""
                  }`}
                  {...register("categoria", { required: "Este campo es obligatorio" })}
                  >
                    <option value="Electronica">Electronica</option>
                    <option value="Jugueteria">Jugueteria</option>
                    <option value="Hogar">Hogar</option>

                  </select>
                  {errors.categoria && (
                    <p className="text-red-500 text-xs italic">{errors.categoria.message}</p>
                  )}
                </div>
              </div>
              {/* Repite este patrón para otros campos de entrada */}
            </div>
        
            <hr className="mt-6 border-b-1 border-blueGray-300" />
       
        </div>
        </form>
      </div>
    </>
  );
}
