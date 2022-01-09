import React, { useState } from "react";
import axios from "axios";
import "./LoginForm.scss";
export default function LoginForm(props) {
  const { setShowLogin } = props;
  const [loginUser, setLoginUser] = useState({
    user_name: "",
    password: "",
  });
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginUser({ ...loginUser, [name]: value });
  };
  // Login user
  //Esta función conecta a través de axios la ruta post de login en la que el usuario introduce su user_name y su password y tras loguearse se ejecuta el .then que es un proceso "automático" que hay que hacer así en el que se codifica el token con jwtDecode, se muestra por pantalla, se recoge en el logalStorage la palabra token y el token propiamente dicho y se setea en el localStorage.

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post("http://localhost:4000/users/login", {
          user_name: loginUser.user_name,
          password: loginUser.password,
        })
        .then((response) => {
          console.log(response);
          localStorage.setItem("token", response.data.token);
          setLoginUser({
            user_name: "",
            password: "",
          });
          window.location.replace("");
        });
    } catch (error) {}
  };
  return (
    <div className="login-form">
      <h2 className="titulo">Formulario de login</h2>
      <form onSubmit={handleSubmit}>
        <label className="inputs">Nombre de usuario </label>
        <input
          type="text"
          id="user_name"
          name="user_name"
          placeholder="username"
          value={loginUser.user_name}
          onChange={handleInput}
        />

        <label className="inputs">Contraseña </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="contraseña"
          value={loginUser.password}
          onChange={handleInput}
        />

        <button type="submit" className="boton-login">
          Login
        </button>
      </form>
      <p className="registrate">
        ¿Aún no estás registrado?{" "}
        <span className="resaltado" onClick={() => setShowLogin(false)}>
          Regístrate
        </span>
      </p>
    </div>
  );
}
