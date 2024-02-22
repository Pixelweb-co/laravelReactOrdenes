import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views
import Dashboard from "views/admin/Dashboard";
import ProductoForm from "views/admin/ProductoForm";
import Productos from "views/admin/Productos";
import Ordenes from "views/admin/Ordenes";



export default function Admin() {
   // Verificar si la variable localStorage.getItem("login") existe
   const isLoggedIn = localStorage.getItem("login");

   // Redireccionar a /api/users/auth si no está autenticado
   if (!isLoggedIn) {
     return <Redirect to="/api/users/auth" />;  
   }

   const logout = () => {
    console.log("logout");
    localStorage.removeItem("login");
  
    return <Redirect to="/api/users/auth" />;
  }

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/formulario-producto/:id" exact component={ProductoForm} />
            <Route path="/admin/ordenes" exact component={Ordenes} />
            <Route path="/admin/formulario-orden/:id" exact component={ProductoForm} />
            <Route path="/admin/productos" exact component={Productos} />
            
            <Redirect from="/admin" to="/admin/dashboard" />

          </Switch>
          <FooterAdmin />
        </div> 
      </div>
    </>
  );
}
