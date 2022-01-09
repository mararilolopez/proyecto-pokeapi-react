//He creado un componente para mostrar los pokemons del usuario al loguearse pero la ruta get me da error por el verify y si lo borro se queda en bucle. He hecho pruebas con las dos rutas que usan verify en server y me dan el mismo error. NO HE CONSEGUIDO UTILIZARLO BIEN.

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

export default function MisPokemons() {
  const [post, setPost] = useState(null);
  const TOKEN = "token";

  useEffect(() => {
    getMisPokemons();
  });

  const getMisPokemons = () => {
    const decodeUser = jwtDecode(localStorage.getItem(TOKEN));
    const userID = decodeUser.user.id;
    console.log(userID);
    axios.get(`http://localhost:4000/pokemon/${userID}`).then((response) => {
      setPost(response);
    });
  };

  /*  React.useEffect(() => {
    const decodeUser = jwtDecode(token);
    console.log(decodeUser);
    const userID = decodeUser.user.id;
    console.log(userID);
    axios.get(`http://localhost:4000/pokemon/9`).then((response) => {
      setPost(response.data);
    });
  }, []); */

  if (!post) return null;

  console.log(post);

  return (
    <div>
      <p>hola</p>
    </div>
  );
}
