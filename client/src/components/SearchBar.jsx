import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsName } from "../redux/actions";
import s from "../components/SearchBar.module.css";
export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault(e);
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault(e);
    console.log("Me clicleaste", name);
    dispatch(getDogsName(name));
  }

  return (
    <div className={s.div}>
      <input
        className={s.li}
        type="text"
        placeholder="Buscar"
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Buscar
      </button>
    </div>
  );
}
