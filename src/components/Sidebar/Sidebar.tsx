import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../styles/components/sidebar.scss";

const Sidebar: React.FC = () => {
  const [openArabes, setOpenArabes] = useState(false);
  const [openDisenador, setOpenDisenador] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  return (
    <aside className="sidebar">
      <ul className="sidebar__menu">
        <li className="sidebar__item">
          <NavLink to="/dashboard" className={({ isActive }) => `sidebar__link ${isActive ? "active" : ""}`}>Dashboard</NavLink>
        </li>

        <li className="sidebar__item">
          <button 
            className="sidebar__link sidebar__link--toggle"
            onClick={() => setOpenNew(!openNew)}
          >
            Perfumes Nuevos
            <span className={`arrow ${openNew ? "open" : ""}`}>▾</span>
          </button>
          {openNew && (
            <ul className="sidebar__submenu">
              <li>
                <NavLink 
                  to="/perfumes/new/crear"
                  className={({ isActive }) => 
                  `sidebar__sublink ${isActive ? "sidebar__sublink--active" : ""}`
                  }
                >
                  Crear
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/perfumes/new/ver"
                  className={({ isActive }) =>
                    `sidebar__sublink ${isActive ? "sidebar__sublink--active" : ""}`
                  }
                >
                  Ver Perfumes
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        <li className="sidebar__item">
          <button 
            className="sidebar__link sidebar__link--toggle"
            onClick={() => setOpenArabes(!openArabes)}
          >
            Perfumes Árabes
            <span className={`arrow ${openArabes ? "open" : ""}`}>▾</span>
          </button>
          {openArabes && (
            <ul className="sidebar__submenu">
              <li>
                <NavLink 
                  to="/perfumes/arabes/crear"
                  className={({ isActive }) => 
                  `sidebar__sublink ${isActive ? "sidebar__sublink--active" : ""}`
                  }
                >
                  Crear
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/perfumes/arabes/ver"
                  className={({ isActive }) =>
                    `sidebar__sublink ${isActive ? "sidebar__sublink--active" : ""}`
                  }
                >
                  Ver Perfumes
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        <li className="sidebar__item">
          <button 
            className="sidebar__link sidebar__link--toggle"
            onClick={() => setOpenDisenador(!openDisenador)}
          >
            Perfumes Diseñador
            <span className={`arrow ${openDisenador ? "open" : ""}`}>▾</span>
          </button>
          {openDisenador && (
            <ul className="sidebar__submenu">
              <li>
                <NavLink 
                  to="/perfumes/disenador/crear"
                  className={({ isActive }) => 
                  `sidebar__sublink ${isActive ? "sidebar__sublink--active" : ""}`
                  }
                >
                  Crear
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/perfumes/disenador/ver"
                  className={({ isActive }) =>
                    `sidebar__sublink ${isActive ? "sidebar__sublink--active" : ""}`
                  }
                >
                  Ver Perfumes
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        <li className="sidebar__item">
          <button 
            className="sidebar__link sidebar__link--toggle"
            onClick={() => setOpenDisenador(!openDisenador)}
          >
            Perfumes Nicho
            <span className={`arrow ${openDisenador ? "open" : ""}`}>▾</span>
          </button>
          {openDisenador && (
            <ul className="sidebar__submenu">
              <li>
                <NavLink 
                  to="/perfumes/nicho/crear"
                  className={({ isActive }) => 
                  `sidebar__sublink ${isActive ? "sidebar__sublink--active" : ""}`
                  }
                >
                  Crear
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/perfumes/nicho/ver"
                  className={({ isActive }) =>
                    `sidebar__sublink ${isActive ? "sidebar__sublink--active" : ""}`
                  }
                >
                  Ver Perfumes
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        <li className="sidebar__item">
          <button 
            className="sidebar__link sidebar__link--toggle"
            onClick={() => setOpenUser(!openUser)}
          >
            Usuarios
            <span className={`arrow ${openUser ? "open" : ""}`}>▾</span>
          </button>
          {openUser && (
            <ul className="sidebar__submenu">
              <li>
                <NavLink 
                  to="/user/crear"
                  className={({ isActive }) => 
                  `sidebar__sublink ${isActive ? "sidebar__sublink--active" : ""}`
                  }
                >
                  Crear
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/user/ver"
                  className={({ isActive }) =>
                    `sidebar__sublink ${isActive ? "sidebar__sublink--active" : ""}`
                  }
                >
                  Ver Usuarios
                </NavLink>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
