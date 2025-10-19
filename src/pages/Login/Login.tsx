import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {showError, showSuccessExecute } from "../../utils/alerts";
import { loginUser } from "../../services/user";

import "../../styles/pages/login.scss";

const emailRegex = /^\S+@\S+\.\S+$/;

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; auth?: string }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('auth') === 'true'){
      navigate('/dashboard');
    }
  },[navigate]);

  const validate = () => {
    const e: { email?: string; password?: string} = {};
    if(!email) e.email = 'El correo es obligatorio';
    else if (!emailRegex.test(email)) e.email = 'Ingrese un correo válido';

    if(!password) e.password = 'La contraseña es obligatoria';
    else if(password.length < 6) e.password = 'La contraseña debe tener al menos 6 caracteres';

    setErrors(e);
    return Object.keys(e).length === 0;
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(!validate()){
      showError("Revisa los campos antes de continuar")
      return;
    }

    setLoading(true);
    setErrors({})

    try {
      const res = await loginUser(email, password);

      if(res.data && res.data.user){
        const {user} = res.data;
        console.log(user)
        localStorage.setItem("auth", "true"); // marca como autenticado (simulado)
        localStorage.setItem("user_id", user.id); 
        localStorage.setItem("user_email", user.email);
        localStorage.setItem("user_name", user.name);
        localStorage.setItem("user_lastname", user.lastname);

        showSuccessExecute("Inicio de sesión exitoso", "Bienvenido", () => {
          navigate("/dashboard");
        });
      }
    } catch (error:any) {
      console.error(error);
      const msg = error.response?.data?.message || "Error al iniciar sesión. Verificar tus credenciales";
      showError(msg);
    } finally{
      setLoading(false);
    }
  };

  const handleRegister = () => {
    navigate(`/register`);
  };

  return(
    <div className="login">
      <div className="login__card">
        <h1 className="login__title">Decanto Aromas Admin</h1>
        <form className="login__form" onSubmit={handleSubmit}>
          <input 
            type="text"
            placeholder="Correo electronico"
            className={`login__input ${errors.email ? "login__input--error" : ""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="login__error-message">{errors.email}</p>}

          <input
            type="password"
            placeholder="Contraseña"
            className={`login__input ${errors.password ? "login__input--error" : ""}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="login__error-message">{errors.password}</p>}

          <button type="submit" className={`login__button ${loading ? "login__button--disabled" : ""}`}>
            {loading ? "Ingresando..." : "Ingresar"}
          </button>

        </form>
        <button onClick={handleRegister} className={`login__button--register ${loading ? "login__button--disabled" : ""}`}>
            {loading ? "Ingresando..." : "Registrarse"}
          </button>
          {errors.auth && <p className="login__error-message">{errors.auth}</p>}
      </div>
      <div className="login__image">
        <img src="/images/login1.jpg" alt="Decanto Aromas" />
      </div>
    </div>
  )
}
  
export default Login;
  