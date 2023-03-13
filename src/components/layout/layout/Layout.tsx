import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import "./layout.scss";

const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <div className="main-wrapper">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
