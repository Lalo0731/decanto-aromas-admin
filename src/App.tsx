import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminLayout from "./layouts/AdminLayout";
import PrivateRoute from "./utils/PrivateRoute";
import PerfumesNewCrear from "./pages/Perfumes/New/Crear";
// import PerfumesView from "./pages/Perfumes/New/Ver";
import PerfumesEdit from "./pages/Perfumes/New/Editar";
import PerfumesDiseCrear from "./pages/Perfumes/Disenador/Crear";
// import PerfumesDiseView from "./pages/Perfumes/Disenador/Ver";
import PerfumesDiseEdit from "./pages/Perfumes/Disenador/Editar";
import PerumesArabeCrear from './pages/Perfumes/Arabes/Crear';
// import PerumesArabeView from './pages/Perfumes/Arabes/Ver';
import PerumesArabeEdit from './pages/Perfumes/Arabes/Editar';

import PerfumesListView from "./pages/Perfumes/PerfumesListView";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />

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
        </Route>

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
