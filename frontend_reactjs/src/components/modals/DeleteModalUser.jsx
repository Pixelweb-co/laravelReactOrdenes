import React from 'react';
import axios from 'axios';
import env from "react-dotenv";

const DeleteModalUser = (props) => {

    console.log('Delete Modal',props.idStudent)

    const deleteUser = async (user)=>{

        try {
            // Enviar datos al servidor usando Axios con el encabezado Content-Type: application/json
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/users/${props.idStudent}`, {
              headers: {
                'Content-Type': 'application/json',
              },
            })
      
            console.log("response: " + JSON.stringify(response))
            // Verificar si la solicitud fue exitosa
            if (response.data.result == 'success') {
              
               window.location.href = '/admin/estudiantes';
            
            } 
          } catch (error) {
            // Manejar errores de la solicitud
            console.error('Error al enviar la solicitud:', error);
          }

    }


    return (

    <div id="deleteModal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-100 justify-center items-center w-200 md:inset-0 h-modal md:h-full">
    <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <button type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
                <span className="sr-only">Cerrar</span>
            </button>
            <p className="mb-4 text-gray-500 dark:text-gray-300">Desea eiminar este estudiante?</p>
            <div className="flex justify-center items-center space-x-4">
                <button onClick={()=>props.hideDialog()} data-modal-toggle="deleteModal" type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                    No, cancelar
                </button>
                <button onClick={()=>deleteUser()} type="submit" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                    Si, eliminar
                </button>
            </div>
        </div>
    </div>
</div>
);

}


export default DeleteModalUser;