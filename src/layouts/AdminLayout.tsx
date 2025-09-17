import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

import "../styles/components/navbar.scss";
import "../styles/components/sidebar.scss";
import "../styles/globals.scss";

function AdminLayout() {
  return (
    <div className="admin-layout">
      <Navbar />
      <div className="admin-body">
        <Sidebar />
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
