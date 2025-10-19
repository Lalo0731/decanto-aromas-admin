import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserById, updateUser } from "../../services/user";
import { showSuccess, showError } from "../../utils/alerts";


const EditarUser: React.FC = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const res = await getUserById(Number(id));
          // console.log("Data:",res.data);
          const u = res.data;

          setName(u.name || "");
          setLastname(u.lastname || "");
          setEmail(u.email|| "");
          setPassword(u.password|| "");

        } catch (err) {
          showError("Error al obtener Usuario");
        }
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.trim() !== "" && password.length < 6) {
      showError("La contraseña debe tener al menos 6 caracteres");
      return;
  }

    try {
      const payload : any = {
        name: name,
        lastname: lastname,
        email: email,
        password: password,
      };

      // console.log("payload",payload)

      await updateUser(Number(id), payload);

      showSuccess("Usuario actualizado con éxito");
    } catch (error) {
      console.log("Error al actualizar Usuario", error);
      showError("Error al actualizar Usuario");
    }
  };

  return (
    <section className="user-form">
      <h2 className="user-form__title">Editar Usuario</h2>

      <form className="user-form__form" onSubmit={handleSubmit}>
        <div className="user-form__group">
          <label htmlFor="name" className="user-form__label">Nombre</label>
          <input
            type="text"
            className="user-form__input"
            value={name}
            onChange={(e) => setName(e.target.value)} 
          />
        </div>

        <div className="user-form__group">
          <label htmlFor="lastname" className="user-form__label">Apellido</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            className="user-form__input"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </div>

        <div className="user-form__group">
          <label htmlFor="email" className="user-form__label">Correo electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            className="user-form__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="user-form__group">
          <label htmlFor="password" className="user-form__label">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            className="user-form__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="perfumes-form__actions full-width">
          <button type="submit" className="perfumes-btn">
            Guardar Cambios
          </button>
        </div>

      </form>
    </section>
  );
};

export default EditarUser;
