import React from "react";
import { useParams } from "react-router-dom";
// components

import CardForm from "components/Cards/CardForm";

export default function ProductoForm() {
  const { id } = useParams();
  return (
    <>
      <div className="flex flex-wrap mt-4">

        <div className="w-full mb-12 px-4">
          <CardForm color="dark" id={id}/>
        </div>
      </div>
    </>
  );
}
