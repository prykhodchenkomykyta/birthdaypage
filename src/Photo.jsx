// Photo.jsx
import React from "react";
import "./Photo.css";

const Photo = ({ src, onClick, style }) => {
  return (
    <img
      className="photo"
      src={src}
      alt="photo"
      onClick={onClick}
      style={style}
    />
  );
};

export default Photo;