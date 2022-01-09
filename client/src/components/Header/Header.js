//Este el header que asocio al usuario logueado
import React from "react";
import "./header.css";
import { useEffect, useState } from "react";

//Función que recoge las props del user con un estado token y setToken, su correspondiente variable llamada TOKEN, el useEffect con el getTokenLocalStorage y la función de getTokenLocalStorage y logout
export default function Header(props) {
  const { user } = props;
  const [token, setToken] = useState(null);

  const TOKEN = "token";
  useEffect(() => {
    getTokenLocalStorage();
  });

  const getTokenLocalStorage = () => {
    setToken(localStorage.getItem(TOKEN));
  };

  //La última línea window.location.replace me permite que la página se recargue automáticamente al ejecutarse esta función, que a su vez, está vinculada al botón Cerrar sesión
  const logout = () => {
    localStorage.removeItem(TOKEN);
    setToken(null);
    window.location.replace("");
  };

  //En pantalla se muestra en el header un string que da la bienvenida al usuario logueado (el nombre del usuario) y le da la opción de cerrar la sesión con un botón
  return (
    <div className="header">
      <h1 className="titulo-header">Bienvenido {user.name}</h1>
      <button className="boton-header" onClick={logout}>
        Cerrar sesión
      </button>
    </div>
  );
}
