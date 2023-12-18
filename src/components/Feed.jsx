import React, { useEffect, useState } from "react";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos } from "./";
import Carousel from "./Carousel";
import AcceptCookiesModal from "./AcceptCookiesModal";

const Feed = () => {
  const [selectedCategory] = useState("live webcam");
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    setVideos(null);
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data) => {
      setVideos(data.items);
    });
  }, [selectedCategory]);

  return (
    <>
      <AcceptCookiesModal />
      <div className="h-screen grid grid-rows-3 gap-8">
        <div className="row-span-2">
          <Carousel />
        </div>
        <div className="row-span-1">
          <Videos videos={videos} />
        </div>
      </div>
    </>
  );
};

export default Feed;
