import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postDogs, getAllTemperaments } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function Formulario() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const history = useHistory();
  const [input, setInput] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
    temperaments: [],
    img: "",
  });
  const [error, setError] = useState({});

  useEffect(() => {
    dispatch(getAllTemperaments());
  }, []);

  function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = "Se requiere un Nombre";
    } else if (!input.height) {
      errors.height = "Se requiere una Altura";
    } else if (!input.weight) {
      errors.weight = "Se requiere un Peso";
    }
    return errors;
  }
  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
  }

  function handleSelect(e) {
    setInput({
      ...input,
      temperaments: [...input.temperaments, e.target.value],
    });
  }
  function handleDelete(e) {
    setInput({
      ...input,
      temperaments: input.temperaments.filter((temp) => temp !== e),
    });
  }

  function handleSubmit(e) {
    e.preventDefault(e);
    console.log(input);
    dispatch(postDogs(input));
    alert("Personaje Creado");
    setInput({
      name: "",
      height: "",
      weight: "",
      life_span: "",
      temperaments: [],
      img: "",
    });
    history.push("/Home");
  }
  return (
    <div>
      <Link to="/Home">
        <button>Volver</button>
      </Link>
      <h1>Crea tu perro!</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Nombre: </label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleInputChange(e)}
          />{" "}
          {error.name && <p>{error.name}</p>}
        </div>

        <div>
          <label>Altura: </label>
          <input
            type="text"
            value={input.height}
            name="height"
            onChange={(e) => handleInputChange(e)}
          />{" "}
          {error.height && <p>{error.height}</p>}
        </div>
        <div>
          <label> Peso: </label>
          <input
            type="text"
            value={input.weight}
            name="weight"
            onChange={(e) => handleInputChange(e)}
          />{" "}
          {error.weight && <p>{error.weight}</p>}
        </div>
        <div>
          <label>Años de vida: </label>
          <input
            type="text"
            value={input.life_span}
            name="life_span"
            onChange={(e) => handleInputChange(e)}
          />{" "}
          {error.life_span && <p>{error.life_span}</p>}
        </div>
        <div>
          <label>imagen: </label>
          <input
            type="text"
            value={input.img}
            name="image"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div>
          <select onChange={(e) => handleSelect(e)}>
            <option value="temp"> Temperamentos </option>
            {temperaments.map((el) => (
              <option value={el.name}>{el.name}</option>
            ))}
          </select>
        </div>
        <div>
          <button type="submit">Crear Perro</button>
        </div>
      </form>
      {input.temperaments.map((el) => (
        <div>
          <p>{el}</p>
          <button onClick={() => handleDelete(el)}>x</button>
        </div>
      ))}
    </div>
  );
}
