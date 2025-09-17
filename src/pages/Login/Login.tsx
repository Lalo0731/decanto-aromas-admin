import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError, showSuccessExecute } from "../../utils/alerts";
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


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if(!validate()){
      showError("Revisa los campos antes de continuar")
      return;
    }

    setLoading(true);
    setErrors({})

    // Simulación de llamada a API
    setTimeout(() => {
      setLoading(false);

      if(email !== "admin.decanto@gmail.com" || password !== "admin123"){
        showError("Credenciales inválidas")
        return;
      }

      localStorage.setItem("auth", "true"); // marca como autenticado (simulado)
      localStorage.setItem("user_email", email);

      showSuccessExecute("Inicio de sesión exitoso", "Bienvenido", () => {
        navigate("/dashboard");
      });
    }, 850);
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
          {errors.auth && <p className="login__error-message">{errors.auth}</p>}
        </form>
      </div>
      <div className="login__image">
        <img src="/images/login1.jpg" alt="Decanto Aromas" />
      </div>
    </div>
  )
}
  
export default Login;
  