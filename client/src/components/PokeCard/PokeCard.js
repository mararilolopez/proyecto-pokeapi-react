import React from "react";
import PokeHijo from "./PokeHijo";
import { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import "./PokeCard.scss";

//CARD DE MATERIAL UI
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";

//Librería sweet alert para mostrar una "alerta al agregar un pokemon"
import Swal from "sweetalert2";

//Este componente es llamado desde App.js, por tanto, en App.js se mostrará todo lo que contenga este componente en su return. Además, en este componente se llama al componente PokeHijo por lo que todo lo que contenga dicho componente también aparecerá en App.js pasando de hijo a padre.
//En App.js se muestran los botones Descubre pokemons, cerrar sesión, este componente (pokecard) y la frase del token (bien o mal). En este componente, he llamado a las props de pokemon (es decir, toda la información de los pokemons) que las recojo entre paréntesis y en la constante pokemon. Después, me he traido la función newPokemon para que el usuario logueado añada a su lista (base da datos) sus pokemons favoritos pulsando el botón agregar. Al traerme esa función he tenido que importar previamente jwtDecode y el token (estado token) por lo que he tenido que declarar dentro de la función, además de las props, el estado token y setToken. A su vez, el estado token está asociado al setToken (el otro estado) que para que no esté vacío debo crear el useEffects, la función getTokenLocalStorage y la constante TOKEN, respectivamente. Es decir, tengo que ir trayéndome aquí todos los datos que voy a ir necesitando.
export default function PokeCard(props) {
  const { pokemon } = props;
  const [token, setToken] = useState(null);
  const TOKEN = "token";

  //Creo una variable llamada Img que trae de la api de Pokemon la imagen de cada pokemon (la imagen está dentro de los datos de pokemon/sprites/front_default)
  const Img = pokemon.sprites.front_default;

  //UseEffect para conseguir el token y setearlo del LocalStorage
  useEffect(() => {
    getTokenLocalStorage();
  });

  const getTokenLocalStorage = () => {
    setToken(localStorage.getItem(TOKEN));
  };
  //Guardar mis pokemons favoritos (Función vinculada al botón agrégame a tu lista). Es la ruta post que vincula a cada pokemon con su usuario.
  const newPokemon = (pokemonID) => {
    const decodeUser = jwtDecode(token);
    const userID = decodeUser.user.id;
    axios
      .post(`http://localhost:4000/pokemon/${userID}/${pokemonID}`, {})
      .then((response) => {
        console.log(response);
      });

    //Función de alerta al agregar un pokemon a la lista que se ejecuta al pinchar el botón de agregar pokemon. El usuario ve en pantalla un mensaje que le informa que ha añadido ese pokemon a la lista
    Swal.fire({
      icon: "success",
      title: "Pokemon añadido a tu lista!!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  //En pantalla se muestra la card de material ui que he elegido donde indico en cada punto qué información quiero mostrar como el nombre del pokemon, el peso o las habilidades. Como los pokemons pueden tener más de una habilidad, he hecho una función (bucle) para hacer un map de todas las habilidades bajo el nombre data imprimiéndose en pantalla data.ability.name, es decir, el nombre de cada una de las habilidades
  //Al final del return he llamado a Pokehijo que incluye una frase que anima al usuario a agregar cada pokemon a su lista
  return (
    <div className="card">
      <React.Fragment>
        <Card sx={{ display: "flex" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                {pokemon.name}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Mi peso es: {pokemon.weight}
              </Typography>
              <p className="habilidades">Estas son mis habilidades:</p>
              {pokemon.abilities.map(function (data) {
                return (
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {data.ability.name}
                  </Typography>
                );
              })}
            </CardContent>
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
              {localStorage.getItem(TOKEN) ? (
                <Button
                  className="boton-card"
                  size="small"
                  onClick={() => newPokemon(pokemon.id)}
                >
                  Agrégame a tu pokedex
                </Button>
              ) : (
                <p>Regístrate para cazarme!!!</p>
              )}
            </Box>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={`${Img}`}
            alt="Live from space album cover"
          />
        </Card>
      </React.Fragment>
      <PokeHijo />
    </div>
  );
}
