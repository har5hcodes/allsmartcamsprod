import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { Typography, Modal } from "@mui/material";
import CheckBoxSharpIcon from "@mui/icons-material/CheckBox";
import CloseIcon from "@mui/icons-material/Close";

import { demoBookUrl, demoChannelTitle } from "../utils/constants";

const BookCard = (props) => {
  const [latestGif, setLatestGif] = useState("");
  const [fileExists, setFileExists] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);

  const handleClose = () => setOpen(false);
  const handleCloseError = () => setOpenError(false);

  const [openAnalyseLoader, setOpenAnalyseLoader] = useState(false);
  const handleCloseAnalyseLoader = () => setOpenAnalyseLoader(false);
  const [analyseMessage, setAnalyseMessage] = useState("Processing.....");

  const [existsInDatabase, setExistsInDatabase] = useState(false);

  const description = "default desciption";//props.video.snippet.description.slice(0, 25);
  const { removeStopwords } = require("stopword");
  const oldString = "oldstring description";//description.split(" ");
  //const tagsList = removeStopwords(oldString);

  const client1 = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL + "camera/",
  });

  const client2 = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL + "snapshotdetails/",
  });

  console.log("book card is ");
  console.log(props);
  const webcamId = props.book.title;
  return (
    <>
      <div className="h-120 w-96 bg-slate-400 flex flex-col justify-between rounded-lg shadow-md p-4">
        <Link to={webcamId ? `/video/${webcamId}` : demoBookUrl}>
          <img
            src={
              fileExists
                ? require(`${process.env.REACT_APP_GENERATED_SNAPS_DIRECTORY}/${latestGif}.gif`)
                : "https://static.commonlounge.com/fp/600w/aU5DciinxDx12vealZDkUJVOy1520485126_kc"
            }
            alt="GIF"
            className="w-full h-48 object-cover rounded-lg shadow-md cursor-pointer"
          />
        </Link>
        <div className="flex flex-col justify-between flex-grow mt-4">
          <div className="font-small text-xl mb-1 overflow-hidden">
            {props.book.title}
          </div>
          <div className="font-small text-xl mb-1 overflow-hidden">
            {props.book.path}
          </div>
        </div>
      </div>

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

export default BookCard;
