import { useState } from "react";
import "./App.css";

const ImageGenerator = () => {
  const [inputValue, setInputValue] = useState(2);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchImage = async () => {
    const inputValue = document.getElementById("input").value;

    if (inputValue > 15 || inputValue < 1) {
      setError("Number should be between 1 and 15");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const response = await fetch(
        `https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(
          Math.random() * 1000
        )}&client_id=k5oSxKwgWQNjtlYKQouT0dNDhjX0w1wFpHuDsvfD_o0`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      const data = await response.json();
      setImages(data.map((pic) => pic.urls.small));
    } catch (error) {
      setError("An error happened while fetching, try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center m-3 p-5 shadow-lg w-[90%] rounded bg-blue-200">
        <h1 className="text-xl">Photo Gallery - Generating random images using Unsplash API</h1>
        <h2 className="font-semibold text-2xl">Enter the number of photos</h2>
        <input
          type="number"
          id="input"
          className="w-[10%] p-2 rounded text-center text-xl mt-2"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          min="1"
          max="15"
        />
        {error && (
          <small className="text-red-600 font-semibold m-2">{error}</small>
        )}
        <button
          className="uppercase w-[18%] mx-5 my-2 h-11 text-xl bg-black text-white rounded hover:bg-green-500 hover:cursor-pointer transition-colors"
          onClick={fetchImage}
        >
          Get Photos
        </button>

        {isLoading && <img src="Spinner.svg" alt="loading" />}

        <div className="flex flex-wrap items-center justify-center">
          {images.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`image-${index}`}
              className="w-[400px] h-[400px] object-cover rounded m-1"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
