import React from "react";

export default function Card({ name, image, id, temperament, weight }) {
  return (
    <div>
      <div className={s.div}>
        <span>{name}</span>
        <img src={image} alt="Imagen del perro." className={s.img} />
        <div className={s.divTemperamento}>
          {temperament?.map((e) => (
            <span> {e.name}</span>
          ))}
        </div>
        <p>Peso: {weight} </p>
      </div>
    </div>
  );
}
