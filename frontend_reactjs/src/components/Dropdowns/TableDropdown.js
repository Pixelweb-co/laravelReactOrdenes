
import { createPopper } from "@popperjs/core";
import { Link } from "react-router-dom";
import React, { useEffect, useState,createRef } from 'react'

const TableDropdown = (props) => {
  // dropdown props

  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const [LinkEdit, setLinkEdit] = useState('#');
  const btnDropdownRef = createRef();
  const popoverDropdownRef = createRef();
  
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const deleteStudent = () => {
  console.log("deleteStudent");
  
  }

  useEffect(() => {
    console.log(props.idStudent)
    if(props.idStudent !== undefined){
      setLinkEdit("/admin/formulario-producto/"+props.idStudent)
    }
  }, [props.idStudent])

  return (
    <>
      <a
        className="text-blueGray-500 py-1 px-3"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <i className="fas fa-ellipsis-v"></i>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >

        <Link  to={LinkEdit} className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }>
         <i className="text-white fas fa-pen-alt"></i>  Editar
        </Link>
        <button
          
          data-modal-target="popup-modal" data-modal-toggle="popup-modal" 
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => props.setDisplay()}
        >
         <i className="text-white fas fa-trash"></i>  Eliminar
        </button>
        
      </div>
    </>
  );
};

export default TableDropdown;
