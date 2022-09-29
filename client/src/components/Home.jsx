import react from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  orderByName,
  filterCreated,
  filterDogsByTemperaments,
  getAllTemperaments,
  getDogs,
} from "../redux/actions";
import Card from "../components/Cards/Card";
import { Link } from "react-router-dom";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import s from "../components/Home.module.css";

export default function Home() {
  function handleFilterByOrder(e) {
    console.log(e.target.value);
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterByTemperaments(e) {
    dispatch(filterDogsByTemperaments(e.target.value));
    setCurrentPage(1);
  }
  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }
  let dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const [order, setOrder] = useState("");
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOdFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOdFirstDog, indexOfLastDog);
  const allTemperaments = useSelector((state) => state.temperaments);
  console.log(allTemperaments);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    dispatch(getDogs());
    dispatch(getAllTemperaments());
  }, []);
  return (
    <div className={s.div}>
      <Link to="/dogs">Crear Perro </Link>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Volver a cargar todos los perros
      </button>
      <div className={s.divSelect}>
        <SearchBar />
        <select
          onChange={(e) => handleFilterByTemperaments(e)}
          className={s.select}
        >
          <option value="temp"> Temperamentos </option>
          {allTemperaments.map((el) => (
            <option value={el.name}>{el.name}</option>
          ))}
        </select>
        <select onChange={(e) => handleFilterByOrder(e)} className={s.select}>
          <option value="asc"> Ascendente </option>
          <option value="desc">Descendente</option>
        </select>
        <select onChange={(e) => handleFilterCreated(e)} className={s.select}>
          <option value="all"> Todos </option>
          <option value="created">Creados</option>
          <option value="api">Existentes</option>
        </select>
        <Paginado
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
        />
        <div className={s.dogsContainer}>
          {currentDogs &&
            currentDogs.map((el) => {
              return (
                <Card
                  id={el.id}
                  name={el.name}
                  image={el.image}
                  temperaments={el.temperament}
                  weight={el.weight}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
