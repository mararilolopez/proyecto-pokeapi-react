import React from "react";
import "./PokeHijo.scss";

//Este componente es hijo del componente PokeCard porque es llamado desde dicho componente. Por lo tanto, todo lo que ponga en el return de este componente aparecerá en el componente PokeCard (que es su padre) y a su vez en App.js, ya que llama al componente PokeCard.
export default function PokeHijo() {
  return (
    <div>
      <h5 className="poke-hijo">
        ¿Seguro que no me quieres añadir a tu lista?
        <p>Pincha en el botón "agrégame a tu lista"</p>
      </h5>
    </div>
  );
}
