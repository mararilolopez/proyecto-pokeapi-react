import React from "react";
import "./header.css";

//Este header es genérico apareciendo en pantalla cuando el usuario no está logueado. En este header hay un string "bienvenido a pocratech" en el que no hay botón de cerrar sesión
export default function HeaderGenerico() {
  return (
    <div className="header">
      <h1 className="titulo-header">BIENVENIDO A POCRATECH </h1>
    </div>
  );
}
