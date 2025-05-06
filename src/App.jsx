import { createClient } from "pexels";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  // Create a Pexels client
  const client = createClient(
    "iNiVxqD7dXyM7xN6nMgLT0uDOqqQcQbtsJS8XccSNp4OupZGZfQi4JKR"
  );
  const query = "nature";

  useEffect(() => {
    // Fetch photos from Pexels
    client.photos
      .search({ query, per_page: 10 })
      .then((response) => {
        setPhotos(response.photos);
        setShownImages(response.photos.slice(0, 6));
      })
      .catch((error) => {
        console.error("Error fetching photos:", error);
      });
  }, []);
  // State to hold the photos
  const [Photos, setPhotos] = useState([]);
  const [Score, setScore] = useState(0);
  const [BestScore, setBestScore] = useState(0);
  const [ClickedImages, setClickedImages] = useState([]);
  const [ShownImages, setShownImages] = useState(Photos);

  // function to set shown pictures
  const shufflePictures = () => {
    const shuffledPhotos = [...Photos].sort(() => Math.random() - 0.5);
    setShownImages(shuffledPhotos.slice(0, 6));
  };
  const handleCLick = (photoID) => {
    if (ClickedImages.includes(photoID)) {
      // If the image has already been clicked, reset the game
      setScore(0);
      setClickedImages([]);
      shufflePictures();
    } else {
      // if the image has not been clicked, increase Score
      setScore(Score + 1);
      //shuffle ShownImages
      shufflePictures();
      setClickedImages([...ClickedImages, photoID]);
      console.log(ClickedImages);
      // Check if the score is greater than the best score
      if (Score + 1 > BestScore) {
        setBestScore(Score + 1);
      }
    }
  };
  return (
    <>
      <h1>Memory Game</h1>
      <div className="memoryCards">
        {ShownImages.map((photo) => (
          <img
            className="memoryPhoto"
            key={photo.id}
            src={photo.src.medium}
            alt={photo.alt}
            onClick={() => handleCLick(photo.id)}
          />
        ))}
      </div>
      <h2>Score: {Score} </h2>
      <h2>Best Score: {BestScore} / 10</h2>
    </>
  );
}

export default App;
