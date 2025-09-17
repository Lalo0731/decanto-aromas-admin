import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminLayout from "./layouts/AdminLayout";
import PrivateRoute from "./utils/PrivateRoute";
import PerfumesNewCrear from "./pages/Perfumes/New/Crear";
import PerfumesView from "./pages/Perfumes/New/Ver";

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
        <Route path="/perfumes/new/ver" element={ <PerfumesView/> } />
            {/* Aquí podrás añadir más rutas protegidas, ejemplo: */}
            {/* <Route path="/perfumes" element={<Perfumes />} /> */}
        </Route>

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
