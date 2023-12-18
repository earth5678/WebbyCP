// Layout.jsx
import React from "react";
import Sidebar from "../Sidebar";

const Layout = ({ children }) => (
  <div>
    <Sidebar />
    <div>{children}</div>
  </div>
);

export default Layout;
