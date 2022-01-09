const connection = require("../config/db");

class pokemonController {
  //Guarda un pokemon por usuario
  savePokemon = (req, res) => {
    const { user_id, pokemon_id } = req.params;

    let sql = `INSERT INTO pokemon (pokemon_id, user_id) VALUES (${pokemon_id}, ${user_id})`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //muestra todos los pokemons guardados por un usuario
  selectPokemonByUser = (req, res) => {
    let user_id = req.params.user_id;

    let sql = `SELECT * FROM pokemon WHERE user_id = ${user_id} AND is_deleted = false`;

    connection.query(sql, (error, result) => {
      error
        ? res.status(400).json({ error })
        : res.status(200).json({ result });
    });
  };

  //elimina pokemon
  deletePokemon = (req, res) => {
    const sql = `UPDATE pokemon SET is_deleted = true WHERE pokemon_id = ${req.params.pokemon_id}`;
    connection.query(sql, (error, results) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error });
      } else {
        console.log(results);
        res.status(200).json({ message: "pokemon eliminado" });
      }
    });
  };
}
module.exports = new pokemonController();
