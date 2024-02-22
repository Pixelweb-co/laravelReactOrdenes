import React from "react";

// components

import CardTable from "components/Cards/CardTable.js";

import DeleteModalUser from 'components/modals/DeleteModalUser';
export default function Productos() {

  const [displayc, setDisplayc] = React.useState(false);
  const [idSel, setidSel] = React.useState(null);

  const showDelete = (show,idSel) =>{
    setDisplayc(true)
    setidSel(idSel)
    console.log("solid ",idSel)
  }

  return (
    <>
      <div className="flex flex-wrap mt-4">

        <div className="w-full mb-12 px-4">
          <CardTable color="dark" showDelete={(dis,id)=>showDelete(true,id)} setIdD={(id)=>setidSel(id)}/>
        </div>
        {displayc &&
          <div className='pl-500 absolute w-600 ml-50 top-10 left-50 text-center'>
            {idSel}
            <DeleteModalUser idStudent={idSel} hideDialog={()=>setDisplayc(false)}/>
          </div>
       }
        </div>
    </>
  );
}
