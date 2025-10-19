import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminLayout from "./layouts/AdminLayout";
import PrivateRoute from "./utils/PrivateRoute";
import PerfumesNewCrear from "./pages/Perfumes/New/Crear";

import PerfumesEdit from "./pages/Perfumes/New/Editar";

import PerfumesDiseCrear from "./pages/Perfumes/Disenador/Crear";
import PerfumesDiseEdit from "./pages/Perfumes/Disenador/Editar";

import PerumesArabeCrear from './pages/Perfumes/Arabes/Crear';
import PerumesArabeEdit from './pages/Perfumes/Arabes/Editar';

import PerfumesNichoCrear from './pages/Perfumes/Nicho/Crear';
import PerfumesNichoEdit from './pages/Perfumes/Nicho/Editar';

import PerfumesListView from "./pages/Perfumes/PerfumesListView";

import UsuariosCrear from "./pages/User/Crear";
import UsuariosEdit from "./pages/User/Editar";
import UsuariosVer from "./pages/User/Ver";
import UserPerfil from "./pages/User/Perfil";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas con layout */}
        <Route 
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={ <Dashboard /> } />
          <Route path="/perfumes/new/crear" element={ <PerfumesNewCrear/> } />
          <Route path="/perfumes/new/ver" element={ <PerfumesListView category="new"/> } />
          <Route path="/perfumes/new/editar/:id" element={ <PerfumesEdit/> } />

          <Route path="/perfumes/disenador/crear" element={ <PerfumesDiseCrear/> } />
          <Route path="/perfumes/disenador/ver" element={ <PerfumesListView category="disenador"/> } />
          <Route path="/perfumes/disenador/editar/:id" element={ <PerfumesDiseEdit/> } />

          <Route path="/perfumes/arabes/crear" element={ <PerumesArabeCrear/> } />
          <Route path="/perfumes/arabes/ver" element={ <PerfumesListView category="arabes"/> } />
          <Route path="/perfumes/arabes/editar/:id" element={ <PerumesArabeEdit/> } />

          <Route path="/perfumes/nicho/crear" element={ <PerfumesNichoCrear/> } />
          <Route path="/perfumes/nicho/ver" element={ <PerfumesListView category="nicho"/> } />
          <Route path="/perfumes/nicho/editar/:id" element={ <PerfumesNichoEdit/> } />

          <Route path="/user/crear" element={ <UsuariosCrear/> } />
          <Route path="/user/ver" element={ <UsuariosVer/> } />
          <Route path="/user/editar/:id" element={ <UsuariosEdit/> } />
          <Route path="/user/perfil" element={ <UserPerfil/> } />
        </Route>

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
