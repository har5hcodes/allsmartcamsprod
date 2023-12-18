import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Loader } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

import AnalysisTable from "./AnalysisTable";

const VideoDetails = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();

  const [gifs, setGifs] = useState([]);
  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL + "snapshotdetails/")
      .then((response) => response.json())
      .then((snapshotdetails) => {
        const gifsTemp = snapshotdetails.filter((snapshot) => {
          return (
            snapshot.liveStreamUrl === `https://www.youtube.com/watch?v=${id}`
          );
        });
        const gifPaths = gifsTemp.map((gif) => gif.generatedGif);
        console.log(gifPaths);
        setGifs(gifPaths);
      });
  }, []);

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    );

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => setVideos(data.items)
    );
  }, [id]);

  if (!videoDetail?.snippet) return <Loader />;

  const {
    snippet: { title, channelTitle },
    statistics: {},
  } = videoDetail;
  const client1 = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL + "camera/",
  });

  const client2 = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL + "snapshotdetails/",
  });
  const addToDatabaseHandler = () => {
    client1
      .post("", {
        camName: channelTitle,
        camUrl: `https://www.youtube.com/watch?v=${id}`,
        camLoc: "New York",
        metadata: title,
      })
      .then((response) => {
        console.log("Camera Uploaded to database.", videoDetail);
      })
      .catch((error) => {
        console.log(error.request.responseText);
      });
  };

  const analyseHandler = () => {
    client2
      .post("", {
        liveStreamUrl: `https://www.youtube.com/watch?v=${id}`,
      })
      .then((response) => {})
      .catch((error) => {
        console.log(error.request.responseText);
      });
  };

  const fileExistsChecker = (gifName) =>
    //fetch(` ${process.env.REACT_APP_GENERATED_SNAPS_DIRECTORY}${gifName}.gif`)
    fetch(` ${process.env.REACT_APP_BACKEND_STATICFILE_URL}${gifName}.gif`)
      .then((response) => {
        if (response.status === 200) {
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        return false;
      });

  return (
    <>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
        <div className="flex flex-col justify-center items-center p-10 w-full">
          <ReactPlayer
            className=" w-full h-full rounded-lg  "
            url={`https://www.youtube.com/watch?v=${id}`}
            controls
          />
          <div className="  w-full p-10">
            <div className="text-2xl font-bold tracking-wide truncate mb-1 text-left">
              {title}
            </div>
            <div className="text-base font-medium tracking-wide mb-4 text-left">
              {channelTitle}
            </div>
            <div className="flex gap-4 ">
              <button
                onClick={addToDatabaseHandler}
                className="bg-white py-2 px-4 border border-gray-400 rounded-lg shadow-md hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                Add to Database
              </button>
              <button
                onClick={analyseHandler}
                className="bg-white py-2 px-4 border border-gray-400 rounded-lg shadow-md hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                Analyze
              </button>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-5 p-4 md:p-8">
            {gifs.map((gifName) => {
              if (fileExistsChecker(gifName)) {
                return (
                  <div
                    key={gifName}
                    className="w-full h-full bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <img
                      src={require(`${process.env.REACT_APP_GENERATED_SNAPS_DIRECTORY}${gifName}.gif`)}
                      alt="gif"
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              } else return null;
            })}
          </div>
        </div>

        <div className="p-10">
          <AnalysisTable />
        </div>
      </div>
    </>
  );
};

export default VideoDetails;
