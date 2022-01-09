import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import UserContext from "./context/UserContext";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

//Vinculación con la hoja de estilo app.scss
import "./scss/app.scss";

//Conexión API
import { getPokemons, getPokemonData } from "./services/api";

//Componentes
import PokeCard from "./components/PokeCard";
import RegisterForm from "./components/Auth/RegisterForm/RegisterForm";
import LoginForm from "./components/Auth/LoginForm";
import Header from "./components/Header/Header";
import HeaderGenerico from "./components/Header/HeaderGenerico";
//No funciona este componente
/* import MisPokemons from "./components/MisPokemons/MisPokemons"; */

//Creo cuatro estados, los dos primeros para traer la información de los pokemons, el tercero crea un estado user para el usuario que esté logueado y un setUser que setee dicho estado. El objetivo de ese estado es crear dos header (Header.js y HeaderGenerico.js) que variarán según si el usuario está logueado o no. En caso de estar logueado aparecerá el botón cerrar sesión mientras que no saldrá dicho botón si no está logueado. El cuarto estado es para recoger y setear el token en el localStorage.
function App() {
  const [trigerPokedex, setTrigerPokedex] = useState(true);
  const [pokemons, setPokemons] = useState([]);
  const [user, setUser] = useState([]);
  const [token, setToken] = useState(null);

  //Creo un estado cuyo valor inicial para showLogin es true y su setEstado es setShowLogin y en el return de App.js creo una ternaria en la que llamo a los componentes LoginForm y RegisterForm. LoginForm si showLogin es verdadero y RegisterForm si es falso. Dichos componentes utilizan el estado setShowLogin declarado aquí en App.js. En cada componente hijo (LoginForm y RegisterForm) declaro una constante de setShowLogin cuyas props es true o false y en cada hijo hago una función handleInput que se ejecutará cuando haya algún cambio en el cualquier input del formulario y una función handleSubmit que se ejecuta cuando se envía el formulario. En el RegisterForm en el momento que envías el formulario de refistro el setShowLogin se pone en true. Además, tras el formulario de registro se muestra la opción de que el usuario se loguee si está registrado ya cuyo setShowLogin también será true. Por su parte, en el LoginForm al enviar el formulario (handleSubmit) se guarda el token con el user_name y el password. Y en este componente solo declaramos setShowLogin como falso en caso de que no esté registrado el usuario al pinchar en el botón regístrate.
  //El setShowLogin no tiene contenido gráfico/visual como tal, solo es un estado cuyo valor es true o false y dependiendo de dicho valor llamará a través de la ternaria al component RegisterForm o LoginForm.
  //Las funciones para registrarse y loguearse finalmente las traslado a sus respectivos archivos js, es decir, LoginForm.js y RegisterForm.js.
  const [showLogin, setShowLogin] = useState(true);

  //Vinculo React con la api con el fetchPokemons y un getTokenLocalStorage para recoger el token del localStorage cada vez que se recargue la página (al ser useEffect) y un getUserLocalStorage para recoger toda la información del usuario que aparece en el localStorage cada vez que se recarga la página. Además, muestra un array con el número de pokemons que he establecido en la ruta de la api de pokemon
  useEffect(() => {
    fetchPokemons();
    getTokenLocalStorage();
    getUserLocalStorage();
  }, [trigerPokedex]);

  //Esta es la función fetchPokemons que llamo justo arriba en el useEffect que recoge los datos de los Pokemons de forma asíncrona para que no se genere un error y React espere a recibir dicha información
  const fetchPokemons = async () => {
    try {
      const data = await getPokemons();
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });
      const result = await Promise.all(promises);
      setPokemons(result);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  // Simulamos que traemos información de un usuario que creamos con estos catos
  const userData = {
    username: "Ricardo",
    school: "Socratech",
    year: 2021,
  };
  //Creamos una variable para el token que la llamamos con un string "token"
  const TOKEN = "token";

  //Esta función reconoce el logueo de un usuario mientras no cierre sesión. Su token seguirá en el localStorage hasta que no se desloguee.
  const getTokenLocalStorage = () => {
    setToken(localStorage.getItem(TOKEN));
  };

  //Esta función obtiene la información del usuario del LocalStorage y compruebo el token del usuario y hago una ternaria en la que se recoge ese token y se decodifica y se trae los datos del usuario (.user) vinculados a dicho token. En caso de no haber token la respuesta será null
  const getUserLocalStorage = () => {
    console.log(localStorage.getItem(TOKEN));
    localStorage.getItem(TOKEN)
      ? setUser(jwtDecode(localStorage.getItem(TOKEN)).user)
      : setUser(null);
  };

  //Esto ya es la "vista" que se muestra al usuario (jsx)
  //En la línea 81 hago una ternaria en la que indico que si hay token me cargue el componente Header con toda la información del usuario y si no hay token que cargue el HeaderGenerico. Después, hay un botón para que el usuario pueda ver nuevos pokemons vinculado al estado setTrigerPokedex, a continuación hago un bucle (.map) de una card que contiene la información de cada Pokemon y al final hago otra ternaria que llama al estado showLogin y que responde en ese caso el componente LoginForm, en caso de que el showLogin sea "false" se mostrará el componente RegisterForm
  return (
    <UserContext.Provider value={userData}>
      <div className="App">
        {token ? <Header user={user} /> : <HeaderGenerico />}
        <div className="botones">
          <button
            className="boton-1"
            onClick={() => setTrigerPokedex(!trigerPokedex)}
          >
            Descubre nuevos pokemons
          </button>
        </div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {pokemons.map((pokemon, idx) => {
              return (
                <Grid item xs={2} sm={4} md={4}>
                  <PokeCard key={idx} pokemon={pokemon} />
                </Grid>
              );
            })}
          </Grid>
        </Box>

        {showLogin ? (
          <LoginForm setShowLogin={setShowLogin} />
        ) : (
          <RegisterForm setShowLogin={setShowLogin} />
        )}
      </div>
    </UserContext.Provider>
  );
}

export default App;
