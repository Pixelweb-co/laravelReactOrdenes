import React from "react";
import { useParams } from "react-router-dom";
// components

import CardOrderForm from "components/Cards/CardOrderForm";

export default function OrdenForm() {
  const { id } = useParams();
  return (
    <>
      <div className="flex flex-wrap mt-4">

        <div className="w-full mb-12 px-4"> 
          <CardOrderForm color="dark" id={id}/>
        </div>
      </div>
    </>
  );
}
