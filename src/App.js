import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MusicPlayer from "./MusicPlayer";
import Photo from "./Photo";
import Explosion from "./Explosion";
import "./App.css";

const App = () => {
  const [photos, setPhotos] = useState([
    "dr1.jpg",
    "dr2.jpg",
    "dr3.jpg",
    "dr4.jpeg",
    "dr5.jpg",
    "dr6.jpg",
    "dr7.jpg",
    "dr8.jpg",
    "dr9.jpg",
  ]);

  const [isExplosionVisible, setExplosionVisible] = useState(true);

  // Function to get a random number between min and max
  const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  useEffect(() => {
    // After a delay, hide the explosion effect
    const hideExplosion = setTimeout(() => {
      setExplosionVisible(false);
    }, 1500);

    // Clean up the timeout when the component is unmounted
    return () => clearTimeout(hideExplosion);
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              photos={photos}
              isExplosionVisible={isExplosionVisible}
              setExplosionVisible={setExplosionVisible}
            />
          }
        />
        {/* Add other routes if needed */}
      </Routes>
    </div>
  );
};

const Home = ({ photos, isExplosionVisible, setExplosionVisible }) => {
  const [showAdditionalImage, setShowAdditionalImage] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [photoPositions, setPhotoPositions] = useState([]);

  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);

  const [wish, setWish] = useState("");
  const [wishSubmitted, setWishSubmitted] = useState(false);

  const [photoClicked, setPhotoClicked] = useState(false);

  // Function to get a random number between min and max
  const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const handlePhotoClick = () => {
    setExplosionVisible(false);
    setShowAdditionalImage(true);
    setPhotoClicked(true);
  };

  const handleWishChange = (event) => {
    setWish(event.target.value);
  };

  const handleWishSubmit = () => {
    setWishSubmitted(true);
    setSubmitButtonClicked(true);
  };

  useEffect(() => {
    // After the explosion effect is over, show the photos
    const showPhotosTimer = setTimeout(() => {
      setShowPhotos(true);
    }, 3000);

    // Clean up the timer when the component is unmounted
    return () => clearTimeout(showPhotosTimer);
  }, []);

  // Function to check if a photo position collides with any other photo
  const checkCollision = (newPosition) => {
    for (const position of photoPositions) {
      if (
        Math.abs(parseInt(position.left) - parseInt(newPosition.left)) < 100 &&
        Math.abs(parseInt(position.top) - parseInt(newPosition.top)) < 100
      ) {
        return true; // Collision detected
      }
    }
    return false; // No collision
  };

  // Function to calculate a new random position for a photo without collision
  const getNewPosition = () => {
    const photoSize = 300; // Adjust this value for the desired photo size
    const margin = 50; // Adjust this value to set the spacing between photos

    const left = getRandomNumber(
      margin,
      window.innerWidth - photoSize - margin
    );
    const top = getRandomNumber(
      margin,
      window.innerHeight - photoSize - margin
    );

    return {
      left: `${left}px`,
      top: `${top}px`,
    };
  };

  // Update the positions of photos to ensure they don't overlap
  useEffect(() => {
    const newPositions = [];
    const maxPhotos = Math.min(photos.length, 9); // Limit the number of photos to 9
    for (let i = 0; i < maxPhotos; i++) {
      const newPosition = getNewPosition();
      newPositions.push(newPosition);
    }
    setPhotoPositions(newPositions);
  }, [showPhotos]);

  return (
    <div>
      {isExplosionVisible && <Explosion />}
      {/* Music player */}
      <div
        className={`music-player-container ${
          photoClicked || submitButtonClicked ? "moved" : ""
        }`}
      >
        <MusicPlayer src={process.env.PUBLIC_URL + "/cats.mp4"} autoPlay />
      </div>
      {/* Randomly positioned and sized photos */}
      {showPhotos &&
        photoPositions.map((position, index) => (
          <Photo
            key={index}
            src={process.env.PUBLIC_URL + `/${photos[index]}`} // Use 'photos' instead of 'photo'
            onClick={handlePhotoClick}
            style={{
              position: "absolute",
              left: position.left,
              top: position.top,
              width: "300px",
              height: "300px",
              transform: `rotate(${getRandomNumber(-15, 15)}deg)`,
            }}
          />
        ))}
      {showAdditionalImage && (
        <div className="additional-image-container">
          <img src={process.env.PUBLIC_URL + "/cake.jpg"} alt="Additional" />
          <input
            type="text"
            placeholder="Enter your wish"
            value={wish}
            onChange={handleWishChange}
          />
          <button onClick={handleWishSubmit}>Submit</button>
          {wishSubmitted && <p>Wish will come true soon!</p>}
        </div>
      )}
    </div>
  );
};

export default App;