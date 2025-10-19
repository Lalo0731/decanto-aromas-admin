import React from "react";
import { useNavigate } from "react-router-dom"
import { showSuccessExecute } from "../../utils/alerts";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    showSuccessExecute("Sesión cerrada", "Hasta pronto", () => {
      localStorage.removeItem("auth");
      localStorage.removeItem("user_email");
      navigate("/login");
    });
  };

  const goToProfile = () => {
    navigate("/user/perfil");
  }

  return (
    <nav className="navbar">
      <div className="navbar__logo">Decanto Aromas</div>
        <div className="navbar__links">
            <button className="navbar__btn" onClick={goToProfile}>Perfil</button>
            <button className="navbar__btn" onClick={handleLogout}>Salir</button>
        </div>
    </nav>
  );
};

export default Navbar;
