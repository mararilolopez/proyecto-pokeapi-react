import React, { useState } from "react";
import axios from "axios";
import "./RegisterForm.scss";

export default function RegisterForm(props) {
  const { setShowLogin } = props;
  const [newUser, setNewUser] = useState({
    name: "",
    user_name: "",
    password: "",
  });

  const handleInput = (e) => {
    const nameInput = e.target.name;
    const valueInput = e.target.value;
    setNewUser({ ...newUser, [nameInput]: valueInput });
  };

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    try {
      axios
        .post("http://localhost:4000/users/saveUser", {
          name: newUser.name,
          user_name: newUser.user_name,
          password: newUser.password,
        })
        .then((response) => {
          console.log(response);
          setNewUser({
            name: "",
            user_name: "",
            password: "",
          });
          setShowLogin(true);
        });
    } catch (error) {}
  };

  return (
    <div className="form-registro">
      <h2 className="titulo-registro">Regístrate</h2>
      <form onSubmit={handleSubmit}>
        <label className="input">Nombre </label>
        <input
          type="text"
          id="name"
          name="name"
          value={newUser.name}
          placeholder="nombre"
          onChange={handleInput}
        />

        <label className="input">Usuario </label>
        <input
          type="text"
          id="user_name"
          name="user_name"
          placeholder="usuario"
          value={newUser.user_name}
          onChange={handleInput}
        />

        <label className="input">Contraseña </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="contraseña"
          value={newUser.password}
          onChange={handleInput}
        />
        <button className="botoncito" type="submit">
          Registrar
        </button>
      </form>
      <p class="frase-registro">
        ¿Ya estás registrado?{" "}
        <span onClick={() => setShowLogin(true)} className="pinchar-aqui">
          Loguéate
        </span>
      </p>
    </div>
  );
}
