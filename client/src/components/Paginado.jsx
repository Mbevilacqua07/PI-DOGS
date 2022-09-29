import React from "react";
import s from "../components/Paginado.module.css";

export default function Paginado({ dogsPerPage, allDogs, paginado }) {
  const pageNumber = [];

  for (let i = 0; i < Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumber.push(i + 1);
  }

  return (
    <nav className={s.nav}>
      <ul className={s.pagination}>
        {pageNumber &&
          pageNumber.map((number) => {
            return (
              <li className={s.listas}>
                <a onClick={() => paginado(number)}>{number} </a>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
