import React from "react";
import ButtonAppBar from "components/layouts/topbar-header.js"
import { Container } from "react-bootstrap";

function Layout ({children}){
    return (
      <div className="Container">
        <ButtonAppBar/>
        {children}
      </div>
    );
}

export default Layout;
