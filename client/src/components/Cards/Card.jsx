import React from "react";
import { Link } from "react-router-dom";
import s from "../Cards/Card.module.css";

export default function Card({ name, image, id, temperaments, weight }) {
  return (
    <div className={s.div}>
      <div>
        <Link to={`/Details/${id}`}>
          <img
            src={image}
            alt="Imagen del perro."
            width="200px"
            className={s.img}
          />
        </Link>
        <span>{name}</span>
        <div className={s.divTemperamento}>
          <span> {temperaments}</span>
        </div>
        <p>Peso: {weight} </p>
      </div>
    </div>
  );
}
