import { useForm } from "react-hook-form";
import axios from "axios";
import React, { useEffect, useState,createRef } from 'react'
import env from "react-dotenv";
import { Link } from "react-router-dom/cjs/react-router-dom";
import moment from "moment";


export default function CardOrderForm(props) {
  const [products,setProducts] = useState([])
  const [Searchproducts,setSearchProducts] = useState(null)
  const [ordenTotal,setOrdenTotal] = useState(0)
  const [saved,setSaved] = useState(false)  
  const [searchValue, setSearchValue] = useState('')
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


  // useEffect(() => {
    
  //   const loadProduct = (id) => {
      
  //     axios
  //     .get(`${process.env.REACT_APP_API_URL}/api/v1/products/${id}`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //     .then((response) => {
  //       console.log("response data ",response.data.nombre);
        
  //     if(!isObjEmpty(response.data)){
  //       setValue('nombre',response.data.nombre)
  //       setValue('precio',response.data.precio)
  //       setValue('stock',response.data.stock)
  //       setValue('categoria',response.data.categoria)
  //       setValue('fecha_registro',response.data.fecha_registro)
  //       setValue('peso',response.data.peso)
  //       setValue('referencia',response.data.referencia)
        
  //     }  
      
  //     })
  //     .catch((error) => {
  //       console.log(error)
    
  //     })
 

  //   }
    
  //   console.log("product ",props.id)
  //   if(props.id !== undefined){
  //     loadProduct(props.id)
  //   }

  // }, [props.id])

  const search = async (val) => {
    
    if(val===''){
      console.log('Empty search')
      return false;
    }

    const res = await axios(
      `${process.env.REACT_APP_API_URL}/api/v1/products/search/${val}`
    );
    const result = await res.data;
    console.log(result);  
    setSearchProducts(result);
  };

  const onChangeHandler = (e)=>{

    search(e.target.value);
    setSearchValue(e.target.value);


  }

  const setItemOrder = ()=>{

    console.log("prd ",Searchproducts)
    
    //if existing
    const exist = products.find(p => p.id === Searchproducts.id)
    console.log("exist ", exist)

    if (exist){

    const newProducts = products.map((item,index)=>{
      
      if(item.id === exist.id){
        console.log("product item n",item)
      
          let productUpdate = {...exist, cnt: exist.cnt + 1, total: exist.precio * (exist.cnt + 1) }
          item = productUpdate
       
      }
      return item

    } )

    console.log("products ew",newProducts)  
    setProducts(newProducts)

  }else{
      
    setProducts([...products,{...Searchproducts,cnt:1,total:(Searchproducts.precio * 1)}])


    }

    _totalizeOrder()
  
  } 

  const deleteItem = (itemId) => {

    const newItems = products.filter(p => p.id !== itemId)
    console.log(newItems)
    setProducts(newItems)

    _totalizeOrder()
  }


  const updateItem = (itemId,value) => {
    console.log(value.target.value)

    if(parseInt(value.target.value) === 0){
      console.log("delete")
      deleteItem(itemId)
      return false
    }


    const newProducts = products.map((item,index)=>{
      
      if(item.id === itemId){
        console.log("product item n",item)
      
          let productUpdate = {...item, cnt: item.cnt = parseInt(value.target.value), total: item.precio * parseInt(value.target.value) }
          item = productUpdate
       
      }
      return item

    } )

    console.log("products ew",newProducts)  
    setProducts(newProducts)
    _totalizeOrder()

  }

  const _totalizeOrder = () => {

    let totalItems = 0
    products.map((item,index)=>{
    
      totalItems += item.total
    
    })

    console.log('total items:', totalItems)

    setOrdenTotal(totalItems)

  }


  const saveOrden = () =>{

    const ordenData = {
      fecha_orden: moment().format('YYYY-MM-DD'),
      cliente:"client",
      items: products,
      totalOrden:ordenTotal
    }

    console.log(ordenData)

    axios.post(`${process.env.REACT_APP_API_URL}/api/v1/ordenes`, ordenData)
    .then((response) => {
    // Manejar el éxito (puedes redirigir o mostrar un mensaje de éxito)
    console.log("Orden enviada exitosamente", response.data);
    
    setSaved(true);

    
    setTimeout(()=>{
      setSaved(false);
    },3000)
  
    })
    .catch((error) => {
      // Manejar el error (puedes mostrar un mensaje de error)
      console.error("Error al enviar la orden", error);
    });


  }


  return (
    <> 
    
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
 
      <form onSubmit={handleSubmit(onSubmit)}>
 
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">{props.id === 0 ? 'Registro de producto' : 'Editar de producto'}</h6>
            <button
              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="submit"
            >
              Guardar información
            </button>
          </div>
        </div>
        <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">

              <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">

                <input 
                type="search"
                value={searchValue}
                onChange={(e) => onChangeHandler(e)} 
                placeholder="Digita el codigo de producto"/>

              {Searchproducts  &&
              <div className="w-full bg-white border p-2 shadow my-2"> 
                
                    <h3 >{Searchproducts.id} - {Searchproducts.nombre} - ${Searchproducts.precio}</h3>

              </div>
              }

              </div>
              <div className=" flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">

                  <button type="button" className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
               onClick={()=>setItemOrder()}>Agregar item</button>
               
               
                  {/* <button type="button">Agregar nuevo item</button> */}

              </div>
              
                </div>

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
              Nueva orden
            </h6>

            <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">{props.id == 0 ? 'Crear Orden' : 'Editar orden'}</h6>
            <button
              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={()=>saveOrden()}
            >
              Crear orden
            </button>
          </div>
        </div>
          
            <div className="block w-full overflow-x-auto">
          {/* Projects table */}

                

          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
              <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (props.color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Código
                </th>
                
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (props.color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Producto
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (props.color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Cantidad
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (props.color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >

        
        
              Valor unidad
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (props.color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Valor total
                </th>
                
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (props.color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Eliminar
                </th>
                
              </tr>
                
            </thead>
            <tbody>
            {products && products.length > 0 && products.map((product,index) => {

              return(

                <tr key={index} className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {product.id}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                     {product.nombre}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <input type="number" onChange={(e)=>updateItem(product.id,e)} value={product.cnt} className="border shadow w-13 text-center"/>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    ${product.precio}
                      
                   </td>
                   <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                   ${product.total}
                  </td>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                   <button className="border shadow p-2 text-center" type="button" onClick={()=>deleteItem(product.id)}>Eliminar</button>
                  </td>
                     
                </tr>
              )
                    })}
             <tr>

              <td colSpan="3"></td>
              <td colSpan="1">Total Orden: </td>
              <td colSpan="1">${ordenTotal}</td>
              <td colSpan="1"></td>
              </tr>       
            </tbody>
          </table>
          
        </div>     


            
        
            <hr className="mt-6 border-b-1 border-blueGray-300" />
       
        </div>
        </form>
      </div>
    </>
  );
}
