import React from "react";
import "../../styles/components/navbar.scss";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">Decanto Aromas</div>
        <div className="navbar__links">
            <button className="navbar__btn">Perfil</button>
            <button className="navbar__btn">Salir</button>
        </div>
    </nav>
  );
};

export default Navbar;
