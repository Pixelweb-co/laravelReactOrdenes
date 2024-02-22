import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "layouts/Admin.js";
import Factura from "layouts/Factura";



ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* add routes with layouts */}
      <Route path="/admin" component={Admin} />
      <Route path="/factura" component={Factura} />
      
      {/* add redirect for first page */}
      <Redirect from="*" to={"/admin"} />
 
       </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
