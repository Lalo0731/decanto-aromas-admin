import React, { useEffect, useState } from "react";
import "../../../styles/pages/perfumesNew.scss";
import { getPerfumes, updatePerfume, deletePerfume } from '../../../services/perfumes';
import { useNavigate } from "react-router-dom";
import { showError, showSuccess, showConfirmDelete } from "../../../utils/alerts";

interface Perfume {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  isDecantOnly: boolean;
  priceDecant: number | null;
  isDecant: boolean;
  isNew: boolean;
  available: boolean;
}

const VerPerfumesNuevos: React.FC = () => {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerfumes = async () => {
      try{
        const response = await getPerfumes();
        setPerfumes(response.data); 
      } catch(error){
        console.log("Error al obtener perfumes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPerfumes();
  },[]);

  const toggleDisponible = async (perfume: Perfume) => {
    try {
      const nuevoEstado = !perfume.available;

      await updatePerfume(perfume.id, { available: nuevoEstado });

      setPerfumes((prev) => 
        prev.map((p) =>
          p.id === perfume.id ? { ...p, available: nuevoEstado } : p
        )
      );
      showSuccess(
        `Perfume ${perfume.name} ahora está ${nuevoEstado ? "activo" : "inactivo"}`
      );
    } catch (error) {
      console.error("Error al actualizar disponibilidad:", error);
      showError("No se pudo actualizar disponibilidad");
    }
  };

  const handleDelete = async (perfume: Perfume) => {
    const confirmed = await showConfirmDelete(perfume.name)
    if (!confirmed) return;

    try {
      await deletePerfume(perfume.id);

      setPerfumes((prev) => prev.filter((p) => p.id !== perfume.id));

      showSuccess(`Perfume ${perfume.name} eliminado correctamente`);
    } catch (error) {
      console.error("Error al eliminar perfume:", error);
      showError("No se pudo eliminar el perfume");
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/perfumes/new/editar/${id}`);
  };

  if(loading) return <p>Cargando perfumes...</p>

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
              <td>{p.name}</td>
              <td>{p.category === "next" ? "nuevo" : p.category}</td>
              <td>${p.price}</td>
              <td>
                <span
                  className={`status ${p.available ? "active" : "inactive"}`}
                >
                  {p.available ? "Sí" : "No"}
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
                  className={`btn-action ${p.available ? "deactivate" : "activate"}`}
                  onClick={() => toggleDisponible(p)}
                >
                  {p.available ? "Dar de baja" : "Activar"}
                </button>
                <button
                  className="btn-action delete"
                  onClick={() => handleDelete(p)}
                >
                  Eliminar
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
