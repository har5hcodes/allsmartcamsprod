import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { Typography, Modal } from "@mui/material";
import CheckBoxSharpIcon from "@mui/icons-material/CheckBox";
import CloseIcon from "@mui/icons-material/Close";

import { demoVideoUrl, demoChannelTitle } from "../utils/constants";

const VideoCard = (props) => {
  const [latestGif, setLatestGif] = useState("");
  const [fileExists, setFileExists] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);

  const handleClose = () => setOpen(false);
  const handleCloseError = () => setOpenError(false);

  const [openAnalyseLoader, setOpenAnalyseLoader] = useState(false);
  const handleCloseAnalyseLoader = () => setOpenAnalyseLoader(false);
  const [prevAnalysed, setPrevAnalysed] = useState(false);
  const [analyseMessage, setAnalyseMessage] = useState("Processing.....");

  const [existsInDatabase, setExistsInDatabase] = useState(false);

  const description = props.video.snippet.description.slice(0, 25);
  const { removeStopwords } = require("stopword");
  const oldString = description.split(" ");
  const tagsList = removeStopwords(oldString);

  const client1 = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL + "camera/",
  });

  const client2 = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL + "snapshotdetails/",
  });

  const webcamId = props.video.id.videoId
    ? props.video.id.videoId
    : props.video.id;

  const addToDatabaseHandler = () => {
    client1
      .post("", {
        camName: props.video.snippet.title,
        camUrl: `https://www.youtube.com/watch?v=${webcamId}`,
        camLoc: "New York",
        metadata: props.video.snippet.description,
      })
      .then((response) => {
        setOpen(true);
      })
      .catch((error) => {
        // Error
        setOpenError(true);
        console.log(error.request.responseText);
      });
  };

  const analyseHandler = () => {
    setOpenAnalyseLoader(true);
    setAnalyseMessage("Analyzing the stream...");

    client2
      .post("", {
        liveStreamUrl: `https://www.youtube.com/watch?v=${webcamId}`,
      })
      .then((response) => {
        setAnalyseMessage(
          "Analysis completed successfully. You can view the latest GIF."
        );
      })
      .catch((error) => {
        console.log(error.request.responseText);
        setAnalyseMessage("Analysis failed. Please try again later.");
      });
  };

  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL + "snapshotdetails/")
      .then((res) => res.json())
      .then((data) => {
        let flag = data.find(
          (snapshot) =>
            snapshot.liveStreamUrl ===
            `https://www.youtube.com/watch?v=${webcamId}`
        );

        if (flag !== undefined) {
          // console.log(flag.generatedGif);
          setLatestGif(flag.generatedGif);
          const fileExistsChecker = fetch(
            `${process.env.REACT_APP_GENERATED_SNAPS_DIRECTORY}${latestGif}.gif`
          )
            .then((response) => {
              if (response.status === 200) {
                setFileExists(true);
              } else {
                setFileExists(false);
              }
            })
            .catch((error) => {
              setFileExists(false);
            });
          setPrevAnalysed(true);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [prevAnalysed]);

  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL + "camera/")
      .then((res) => res.json())
      .then((data) => {
        let flag = data.find(
          (cameraDetail) =>
            cameraDetail.camUrl ===
            `https://www.youtube.com/watch?v=${webcamId}`
        );
        if (flag !== undefined) {
          setExistsInDatabase(true);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [open]);

  return (
    <>
      <div className="w-80   md:w-96 bg-slate-400 flex flex-col justify-between rounded-lg shadow-md p-4">
        <Link to={webcamId ? `/video/${webcamId}` : demoVideoUrl}>
          <img
            src={
              fileExists
                ? require(`${process.env.REACT_APP_GENERATED_SNAPS_DIRECTORY}/${latestGif}.gif`)
                : props.video.snippet.thumbnails.high.url
            }
            alt="GIF"
            className="w-full h-48 object-cover rounded-lg shadow-md cursor-pointer"
          />
        </Link>
        <div className="flex flex-col justify-between flex-grow mt-4">
          <div className="flex flex-wrap gap-2 mb-2 overflow-hidden">
            {tagsList.slice(0, 3).map((tag, index) => {
              if (tag.length > 0) {
                return (
                  <div
                    key={index}
                    className="bg-white px-3 py-1 rounded-md text-xs md:text-sm cursor-pointer"
                  >
                    {tag}
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
          <div className="font-medium text-lg md:text-xl mb-1 overflow-hidden">
            {props.video.snippet?.channelTitle || demoChannelTitle}
          </div>
          {prevAnalysed ? (
            <div className="text-sm mb-2 overflow-hidden">You can hover.</div>
          ) : (
            <div className="text-sm mb-2 overflow-hidden">
              Click on analyse to generate a gif.
            </div>
          )}
          <div className="flex gap-4 overflow-hidden">
            {!existsInDatabase && (
              <button
                onClick={addToDatabaseHandler}
                className="bg-white py-1 px-2 rounded-md hover:bg-gray-200 focus:outline-none"
              >
                Add to Database
              </button>
            )}
            <button
              onClick={analyseHandler}
              className="bg-white py-1 px-2 rounded-md hover:bg-gray-200 focus:outline-none"
            >
              Analyse
            </button>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white rounded-lg shadow-lg p-6 relative">
            <button
              className="absolute top-0 right-0 m-3 text-gray-400 hover:text-gray-800"
              onClick={handleClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="flex items-center">
              <CheckBoxSharpIcon className="text-green-500 text-4xl mr-2" />
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                className="text-gray-800 font-bold"
              >
                Webcam added to database successfully.
              </Typography>
            </div>
            <Typography
              id="modal-modal-description"
              className="text-gray-600 mt-8"
            >
              You can now analyse this webcam.
            </Typography>
          </div>
        </div>
      </Modal>

      {/* <Modal
        open={openError}
        onClose={handleCloseError}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-row-reverse justify-start items-center">
              <button onClick={handleCloseError}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600 hover:text-gray-800 cursor-pointer"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 8.586L3.757 2.343A1 1 0 102.343 3.757L8.586 10l-6.243 6.243a1 1 0 101.414 1.414L10 11.414l6.243 6.243a1 1 0 001.414-1.414L11.414 10l6.243-6.243a1 1 0 00-1.414-1.414L10 8.586z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                className="text-gray-800 font-bold mr-4"
              >
                camera with this camUrl already exists.
              </Typography>
            </div>
          </div>
        </div>
      </Modal> */}
      <Modal
        open={openAnalyseLoader}
        onClose={handleCloseAnalyseLoader}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <div className="relative bg-white rounded-lg shadow-lg p-6">
            <button
              className="absolute top-0 right-0 m-2"
              onClick={handleCloseAnalyseLoader}
            >
              <CloseIcon sx={{ fontSize: 20 }} />
            </button>
            {analyseMessage}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default VideoCard;
