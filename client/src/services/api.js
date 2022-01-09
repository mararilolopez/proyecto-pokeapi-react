// Traemos pokemones de la Api a nuestro pokedex desde el 0 al 1112 y el número que ponga tras el limit= es el número de pokemons que me mostrará por pantalla en un array (en este caso 6)
export const getPokemons = async () => {
  let offset = getRandonInt(0, 1113);
  try {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=6s&offset=${offset}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Traemos la información de cada Pokemon
export const getPokemonData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

//Conseguimos un pokemon randon
function getRandonInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
