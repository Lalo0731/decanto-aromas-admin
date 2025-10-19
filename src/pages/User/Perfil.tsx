import React, { useEffect, useState } from "react";
import { showSuccess, showError } from "../../utils/alerts";
import { updateUser } from "../../services/user";
import "../../styles/pages/userForm.scss";

const Perfil: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("user_email") || "";
    const storedName = localStorage.getItem("user_name") || "";
    const storedLastname = localStorage.getItem("user_lastname") || "";
    const storedId = localStorage.getItem("user_id");

    setEmail(storedEmail);
    setName(storedName);
    setLastname(storedLastname);
    if (storedId) setUserId(parseInt(storedId));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.trim() !== "" && password.length < 6) {
        showError("La contraseña debe tener al menos 6 caracteres");
        return;
    }

    try {
        const payload : any = {
          name,
          lastname,
          email,
        };

        if (password.trim() !== "") {
            payload.password = password;
          }
  
        // console.log("payload",payload)
        setPassword("");
        await updateUser(Number(userId), payload);
        showSuccess("Usuario actualizado con éxito");
      } catch (error) {
        console.log("Error al actualizar Usuario", error);
        showError("Error al actualizar Usuario");
      }
  };

  return (
    <div className="user-form">
      <h1 className="user-form__title">Mi Perfil</h1>
      <form onSubmit={handleSubmit} className="user-form__form">
        <div className="user-form__group">
            <label className="user-form__label">Nombre</label>
            <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="user-form__input"
            />
        </div>

        <div className="user-form__group">
            <label className="user-form__label">Apellido</label>
            <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="user-form__input"
            />
        </div>

        <div className="user-form__group">
            <label>Correo electrónico</label>
            <input
            type="email"
            value={email}
            className="user-form__input"
            />
        </div>

        <div className="user-form__group">
            <label>Nueva contraseña</label>
            <input
            type="password"
            placeholder="(Opcional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="user-form__input"
            />
        </div>

        <button type="submit" className="user-form__button">
        Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default Perfil;
