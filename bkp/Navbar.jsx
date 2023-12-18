import { Link } from "react-router-dom";
import React, { useState } from "react";
import { logo } from "../utils/constants";
import { SearchBar } from "./";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ControlCameraIcon from "@mui/icons-material/ControlCamera";
import {
  Paper,
  IconButton,
  Button,
  Box,
  Modal,
  TextField,
} from "@mui/material";

import { FaBars, FaSearch } from "react-icons/fa";
import { FiX } from "react-icons/fi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const client = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL+"camera/",
});

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openSideNavbar, setOpenSideNavbar] = React.useState(false);
  const handleOpenSideNavbar = () => setOpenSideNavbar(true);
  const handleCloseSideNavbar = () => setOpenSideNavbar(false);

  const [webcamName, setWebcamName] = useState("");
  const [webcamUrl, setWebcamUrl] = useState("");

  const SubmitWebcamHandler = () => {
    client
      .post("", {
        camName: webcamName,
        camUrl: webcamUrl,
      })
      .then((response) => {
        console.log("Uploaded");
      })
      .catch((error) => {
        // Error
        console.log(error.request.responseText);
      });
    setWebcamName("");
    setWebcamUrl("");
  };

  // <Stack
  //   direction="row"
  //   alignItems="center"
  //   p={2}
  //   sx={{
  //     position: "sticky",
  //     background: "#000",
  //     top: 0,
  //     justifyContent: "space-between",
  //   }}
  // >
  //   <Link to="/" style={{ display: "flex", alignItems: "center" }}>
  //     <img src={logo} alt="logo" height={45} />
  //   </Link>
  //   <SearchBar />
  // </Stack>

  return (
    <div className="flex items-center justify-between sticky bg-slate-300 p-4 h-20 w-full">
      <FaBars className="text-xl lg:hidden" onClick={handleOpenSideNavbar} />
      <Link
        to="/"
        style={{ display: "flex", alignItems: "center" }}
        className="font-extrabold  text-xl tracking-wider text-slate-700"
      >
        <ControlCameraIcon className="text-slate-700 mr-1" />
        SmartCam
      </Link>
      <FaSearch className="lg:hidden" />
      <SearchBar />

      <div className="hidden lg:flex items-center justify-center gap-8   ">
        <a href="/signup">Sign Up</a>
        <a href="/login">Log In</a>
        <button onClick={handleOpen} className="bg-white py-2 px-4">
          Submit a Webcam
        </button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <TextField
              color="secondary"
              id="outlined-basic"
              label="Webcam Name"
              variant="outlined"
              value={webcamName}
              onChange={(e) => setWebcamName(e.target.value)}
            />
            <TextField
              color="secondary"
              id="outlined-basic"
              label="Webcam Url"
              variant="outlined"
              value={webcamUrl}
              onChange={(e) => setWebcamUrl(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={SubmitWebcamHandler}
              sx={{ backgroundColor: "#FC1503", color: "white" }}
            >
              Submit webcam
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={openSideNavbar}
        onClose={handleCloseSideNavbar}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="h-screen w-full bg-slate-400  ">
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <FiX
              className="text-2xl  absolute top-5 right-5"
              onClick={handleCloseSideNavbar}
            />
            <a
              href="/signup"
              className="text-2xl mt-16 pl-10 font-bold tracking-wide cursor-pointer"
            >
              Sign Up
            </a>
            <a
              href="/login"
              className="text-2xl mt-2 pl-10 font-bold tracking-wide cursor-pointer"
            >
              Log In
            </a>

            <a
              href="/login"
              className="text-2xl mt-2 pl-10 font-bold tracking-wide cursor-pointer"
            >
              Submit a webcam
            </a>
          </Box>
        </div>
      </Modal>

    </div>
  );
};

export default Navbar;
