import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    children: JSX.Element;
  }

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const isAuth = localStorage.getItem("auth") === "true";

    return isAuth ? children : <Navigate to="login" replace />
};

export default PrivateRoute;