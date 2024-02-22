import React from "react";

// components

import CardStats from "components/Cards/CardStats.js";

export default function HeaderFactura() {
  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full  px-4">

                  <div className="w-full bg-slate-300 p-5">

                    
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="peso"
                  >
                    Cliente
                  </label>
                  <input
                    type="text"
                    
                    className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150`} />
                  
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
                    Fecha factura
                  </label>
                  <input
                    type="text"
                    defaultValue={(new Date().toDateString())}
                    className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150`} />
                  
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
                    Factura Nro
                  </label>
                  <input
                    type="text"
                    
                    className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150`} />
                  
                </div>
              </div>
              {/* Repite este patrón para otros campos de entrada */}
            </div>
            

                  </div>   



              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
