import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../redux/actions";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Detail(props) {
  console.log(props);
  const dispatch = useDispatch();
  const myDog = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
    console.log(props.match.params.id, "Hola");
  }, [dispatch]);

  return (
    <div>
      {myDog.length > 0 ? (
        <div>
          <h1> {myDog[0].name}</h1>
          <img src={myDog[0].img ? myDog[0].img : myDog[0].image} />
          <h2> Peso: {myDog[0].weight}</h2>
          <h2> Altura: {myDog[0].height}</h2>
          <h2> Vida estimada: {myDog[0].life_span}</h2>
          <h4>
            {" "}
            Temperamentos:{" "}
            {!myDog[0].createdDb
              ? myDog[0].temperament + " "
              : myDog[0].temperament.map((el) => el.name + " ")}
          </h4>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
      <Link to="/Home">
        <button>Volver</button>
      </Link>
    </div>
  );
}
