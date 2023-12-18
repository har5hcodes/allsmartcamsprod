import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const axios = require("axios");

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const { searchTerm, searchOption } = useParams();

  useEffect(() => {
    setVideos(null);

    const fetchFromYoutube = () => {
      fetchFromAPI(`search?part=snippet&q=${searchTerm}`).then((data) => {
        setVideos(data.items);
      });
    };

    const fetchSearchResults = () => {
      return new Promise(async (resolve, reject) => {
        if (!searchTerm) {
          console.log("Search term is empty");
          reject(new Error("Search term is empty"));
        }

        const videoDetails = [];
        const searchResultCameraId = [];

        try {
          var url = process.env.REACT_APP_BACKEND_URL + "search_snapshots?q="+searchTerm;
          console.log("url is " + url);
          const response = await fetch(
            url
            //`process.env.REACT_APP_BACKEND_URL + "search_snapshots/?q={searchTerm}"`
            //http://127.0.0.1:8000/displaycode/search_snapshots?q=${searchTerm}`
          );
          if (!response.ok) {
            console.log(`Response status is ${response.status}`);
            reject(new Error(`Response status is ${response.status}`));
          }

          const data = await response.json();

          data.results.map((item) => {
            const url = item.camera.camUrl;
            const videoId = url.match(/(?:[?&]v=)([^&]+)/)[1];

            if (!searchResultCameraId.includes(videoId)) {
              searchResultCameraId.push(videoId);
            }
          });

          const requests = searchResultCameraId.map((videoId, index) => {
            const options = {
              method: "GET",
              url: "https://youtube-v31.p.rapidapi.com/videos",
              params: {
                part: "snippet",
                id: videoId,
              },
              headers: {
                "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
                "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
              },
            };

            // add delay between API calls
            const delay = index * 200; // 1000 milliseconds = 1 second
            return new Promise((resolve) => {
              setTimeout(() => {
                axios
                  .request(options)
                  .then(function (response) {
                    videoDetails.push(response.data.items[0]);
                    console.log(response.data.items[0]);
                    resolve();
                  })
                  .catch(function (error) {
                    console.error(error);
                    resolve();
                  });
              }, delay);
            });
          });

          await Promise.all(requests);
          resolve(videoDetails);
        } catch (error) {
          console.error(`Error: ${error}`);
          reject(error);
        }
      });
    };
    if (searchOption === "youtube") {
      fetchFromYoutube();
    } else {
      fetchSearchResults().then((videoDetails) => {
        setVideos(videoDetails);
      });
    }
  }, [searchTerm]);

  return (
    <div>
      <div className="text-2xl tracking-wide font-bold px-10 py-5">
        Search Results for
        <span style={{ color: "#FC1503" }}> {searchTerm}</span> videos
      </div>

      {<Videos videos={videos} />}
    </div>
  );
};

export default SearchFeed;
