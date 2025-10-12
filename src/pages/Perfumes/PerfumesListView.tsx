import React, { useEffect, useState } from "react";
import "../../styles/pages/perfumesNew.scss";
import { getPerfumes, updatePerfume, deletePerfume } from "../../services/perfumes";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess, showConfirmDelete } from "../../utils/alerts";

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

interface PerfumesListProps {
  category: "arabes" | "disenador" | "new";
}

const PerfumesListView: React.FC<PerfumesListProps> = ({ category }) => {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔹 Cargar perfumes según categoría
  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const response = await getPerfumes(category);
        setPerfumes(response.data);
      } catch (error) {
        console.error("Error al obtener perfumes:", error);
        showError("No se pudieron cargar los perfumes");
      } finally {
        setLoading(false);
      }
    };
    fetchPerfumes();
  }, [category]);

  // 🔹 Cambiar estado de disponibilidad
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

  // 🔹 Eliminar perfume
  const handleDelete = async (perfume: Perfume) => {
    const confirmed = await showConfirmDelete(perfume.name);
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

  // 🔹 Editar perfume según categoría
  const handleEdit = (id: number) => {
    navigate(`/perfumes/${category}/editar/${id}`);
  };

  if (loading) return <p>Cargando perfumes...</p>;

  const titulo =
    category === "arabe"
      ? "Listado de Perfumes Árabes"
      : category === "diseñador"
      ? "Listado de Perfumes de Diseñador"
      : category === "nicho"
      ? "Listado de Perfumes Nicho"
      : "Listado de Perfumes Nuevos";

  return (
    <div className="perfumes-view">
      <h2>{titulo}</h2>
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
              <td>{p.category === "next" ? "Nuevo" : p.category === "disenador" ? "Diseñador" : "Árabe"}</td>
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

export default PerfumesListView;
