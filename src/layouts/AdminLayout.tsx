import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

import "../styles/components/navbar.scss";
import "../styles/components/sidebar.scss";
import "../styles/globals.scss";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">

      {/* BOTÓN HAMBURGUESA (solo móvil) */}
      <button
        className="sidebar__hamburger"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      <Navbar />

      <div className="admin-body">
        {/* AQUI SÍ SE PASAN LOS PROPS */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
