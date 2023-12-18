import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos, Sidebar } from "./";
import { useRouter } from "next/router";



const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("live webcam");
  const [videos, setVideos] = useState(null);
  const [filters, setFilters] = useState([]);
  const router = useRouter();

  const goToHome = () => {
    router.push("/");
  };

  const goToUpload = () => {
    router.push("/upload");
  };





  useEffect(() => {
    setVideos(null);

    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data) =>
      setVideos(data.items)
    );
  }, [selectedCategory]);

  const addFilterHandler = (selectedFilter) => {
    setFilters((prev) => [...prev, selectedFilter]);
  };

  const removeFilterHandler = (removeFilter) => {
    const newFilters = filters.filter((e) => e !== removeFilter);
    setFilters(newFilters);
  };

  return (
    <div className="p-7  grid   h-screen">
      {/* <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
        {selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
      </Typography>  */}
      <div>
        <Videos videos={videos} addFilterHandler={addFilterHandler} />
      </div>

      <div> raghuram upload code </div>
      <div>
        <ul>
          <li onClick={goToHome}>Home</li>
          <li onClick={goToUpload}>Upload Book. It will overwrite existing book with same name</li>
          <li>About</li>
        </ul>
      </div>




      {/* <div className="col-span-1 bg-white px-4">
        <div className="text-xl my-5">Filters Added</div>
        <div>
          {filters.map((filter) => {
            return (
              <span className="inline-flex px-3 py-2  mr-2 mb-2 text-md font-semibold leading-5 text-green-800 bg-green-100 rounded-full justify-center items-center">
                <span>{filter}</span>
                <CloseIcon
                  className="cursor-pointer"
                  onClick={() => removeFilterHandler(filter)}
                />
              </span>
            );
          })}
        </div>
      </div> */}
    </div>
  );
};

export default Feed;
