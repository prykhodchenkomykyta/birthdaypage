import React from "react";

const MusicPlayer = ({ src }) => {
  return (
    <audio controls autoPlay>
      <source src={src} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default MusicPlayer;
