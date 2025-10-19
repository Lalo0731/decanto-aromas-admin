import React, {useEffect, useState } from "react";
import { getUser, deleteUser } from "../../services/user";
import { useNavigate } from "react-router-dom";
import { showUserConfirmDelete, showError, showSuccess } from "../../utils/alerts";

interface User{
  id: number;
  name: string;
  lastname: string;
  email: string;
}

const VerUser: React.FC = () => {
  const [user, setUser] = useState<User[]>([]); 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();
        // console.log(response.data)
        setUser(response.data);
      } catch (error) {
        console.error("Error al obtener perfumes:", error);
        showError("No se pudieron cargar los perfumes");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  },[]);

  const handleEdit = (id: number) => {
    navigate(`/user/editar/${id}`);
  };

  const handleDelete = async (user: User) => {
    const confirmed = await showUserConfirmDelete(user.name );
    if (!confirmed) return;

    try {
      await deleteUser(user.id);
      showSuccess("Usuario eliminado con éxito");

      // 🔄 Actualiza la lista local sin recargar la página
      setUser((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
    } catch (error) {
      console.log("Error al eliminar usuario", error);
      showError("Error al eliminar usuario");
    }
  };

  if (loading) return <p>Cargando Usuarios...</p>;

  return (
    <div className="perfumes-view">
      <h2>Lista de Usuarios</h2>
      <table className="perfumes-view__table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {user.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.lastname}</td>
              <td>{p.email}</td>
              <td>
                <button
                  className="btn-action edit"
                  onClick={() => handleEdit(p.id)}
                >
                  Editar
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

export default VerUser;
