import React, { useState } from "react";
import "../../styles/pages/userForm.scss";
import { createUser } from "../../services/user";
import { useNavigate } from "react-router-dom";
import { showSuccessExecute, showError } from "../../utils/alerts";


const Register: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        email: "",
        password: "",
    });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password.trim() !== "" && formData.password.length < 6) {
      showError("La contraseña debe tener al menos 6 caracteres");
      setLoading(false);
      return;
  }

    try {
      await createUser(formData);
      // console.log(response);
  
      showSuccessExecute("Usuaio creado correctamente", "Bienvenido", () => {
        navigate("/login");
      });
      setFormData({ name:"", lastname:"", email:"", password:"" });
      
    } catch (error) {
      console.log(error);
      showError("Error al crear el usuario")
    } finally{
      setLoading(false);
    }
  }

  const handleLogin = () => {
    navigate(`/Login`);
  };

  return (
    <section className="user-form">
      <h2 className="user-form__title">Crear Usuario</h2>

      <form className="user-form__form" onSubmit={handleSubmit}>
        <div className="user-form__group">
          <label htmlFor="name" className="user-form__label">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            className="user-form__input"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="user-form__group">
          <label htmlFor="lastname" className="user-form__label">Apellido</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            className="user-form__input"
            value={formData.lastname}
            onChange={handleChange}
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
            value={formData.email}
            onChange={handleChange}
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
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="user-form__button"
          disabled={loading}
        >
          {loading ? "Guardando..." : "Crear Usuario"}
        </button>

      </form>

      <button
        onClick={handleLogin}
        className="user-form__button--login"
        disabled={loading}
        >
          {loading ? "cargando..." : "Regresar"}
        </button>
    </section>
  );
};

export default Register;
