import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types"
import axios from 'axios'
import moment from 'moment'
import { Link } from "react-router-dom";
import env from "react-dotenv";
// components
import TableDropdown from "components/Dropdowns/TableDropdown.js";

export default function CardTableOrders(props) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayc,setDisplayC] = useState(false);

  useEffect(() => {
    // setLoading(true)
    
    getOrdersData()
  }, [])

  function getOrdersData() {

          axios
            .get(`${process.env.REACT_APP_API_URL}/api/v1/orders`, {
              headers: {
                'Content-Type': 'application/json',
              },
            })
            .then((response) => {
              
             setOrders(response.data) 
             })
            .catch((error) => {
              console.log(error)
          
            })
       
      }  

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (props.color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (props.color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Listado de Ordenes
              </h3>
            </div>
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
                  Orden
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (props.color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Fecha de registro
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (props.color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >

        
        
              Cliente
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (props.color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                Valor Total
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (props.color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
            {orders && orders.length > 0 && orders.map((order,index) => {

              return(

                <tr key={order.id} className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                    <img
                      src={require("assets/img/bootstrap.jpg").default}
                      className="h-12 w-12 bg-white rounded-full border"
                      alt="..."
                    ></img>{" "}
                    <span
                      className={
                        "ml-3 font-bold " +
                        +(props.color === "light" ? "text-blueGray-600" : "text-white")
                      }
                    >
                     <Link to={("/admin/formulario-orden/"+order.id)}> # {order.id}</Link>
                     </span>
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {moment(order.created_at).format("YYYY-MM-DD")}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                     {order.id}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {order.cliente}
                      
                   </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  $ {order.valor_total}
                  </td>


                  <td className="border-t-0 px-8 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                  {order.id ? ( 
                    <TableDropdown idStudent={order.id} setDisplay={()=>props.showDelete(true,order.id)} />
                  ) : ''}
                  </td>
                </tr>
              )
                    })}
                    
            </tbody>
          </table>
          
        </div>
      </div>
      
    
    </>
  );
}

CardTableOrders.defaultProps = {
  color: "light",
};

CardTableOrders.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
