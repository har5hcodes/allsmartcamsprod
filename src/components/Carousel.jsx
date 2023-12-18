import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Carousel = () => {
  const [videoId, setVideoId] = useState("");
  const [gifs, setGifs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}snapshotdetails/`
      );
      const data = await response.json();
      console.log(data);
      setGifs(data.slice(0, 5));
    };
    fetchData();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 4 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 4 : prevIndex - 1));
  };

  useEffect(() => {
    const intervalId = setInterval(handleNext, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const opts = {
    height: "600",
    width: "1100",
  };

  return (
    <div className="relative flex justify-center items-center w-full h-full  ">
      {gifs.length > 0 && (
        <img
          src={require(`../generatedSnaps/${gifs[0].generatedGif}.gif`)}
          className="h-full w-full object-cover"
        />
      )}
      {/* <YouTube videoId={"lx5vVGxusnc"} onReady={handleVideoReady} opts={opts} /> */}
      <div className="absolute left-4 md:left-12 top-1/2 transform -translate-y-1/2">
        <button
          className="p-3 rounded-full bg-white text-slate-700 shadow-lg focus:outline-none"
          onClick={handlePrev}
        >
          <FontAwesomeIcon icon={faArrowLeft} size="2x" />
        </button>
      </div>
      <div className="absolute right-4 md:right-12 top-1/2 transform -translate-y-1/2">
        <button
          className="p-3 rounded-full  bg-white text-slate-700 shadow-lg focus:outline-none"
          onClick={handleNext}
        >
          <FontAwesomeIcon icon={faArrowRight} size="2x" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
