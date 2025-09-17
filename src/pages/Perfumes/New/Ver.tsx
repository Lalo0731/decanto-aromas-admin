import React, { useState } from "react";
import "../../../styles/pages/perfumesNew.scss";

interface Perfume {
  id: number;
  nombre: string;
  precio: number;
  disponible: boolean;
  categoria: string;
}

const VerPerfumesNuevos: React.FC = () => {
  const [perfumes, setPerfumes] = useState<Perfume[]>([
    { id: 1, nombre: "Fragancia 1", precio: 120, disponible: true, categoria: "Árabes" },
    { id: 2, nombre: "Fragancia 2", precio: 150, disponible: false, categoria: "Diseñador" },
  ]);

  const toggleDisponible = (id: number) => {
    setPerfumes((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, disponible: !p.disponible } : p
      )
    );
  };

  const handleEdit = (id: number) => {
    // Aquí redirigiremos a la vista de edición
    alert(`Editar perfume con id: ${id}`);
  };

  return (
    <div className="perfumes-view">
      <h2>Listado de Perfumes Nuevos</h2>
      <table className="perfumes-view__table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Disponible</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {perfumes.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.categoria}</td>
              <td>${p.precio}</td>
              <td>
                <span
                  className={`status ${p.disponible ? "active" : "inactive"}`}
                >
                  {p.disponible ? "Sí" : "No"}
                </span>
              </td>
              <td>
                <button
                  className="btn-action edit"
                  onClick={() => handleEdit(p.id)}
                >
                  Editar
                </button>
                <button
                  className={`btn-action ${p.disponible ? "deactivate" : "activate"}`}
                  onClick={() => toggleDisponible(p.id)}
                >
                  {p.disponible ? "Dar de baja" : "Activar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VerPerfumesNuevos;
