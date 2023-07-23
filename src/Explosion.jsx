import React from "react";
import "./Explosion.css";
import explosionImage from "./exp.png";

const Explosion = () => {
  return (
    <div className="explosion-container">
      <img className="explosion" src={explosionImage} alt="explosion" />
    </div>
  );
};

export default Explosion;
