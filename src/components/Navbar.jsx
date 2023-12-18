import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { SearchBar } from "./";
import axios from "axios";
import ControlCameraIcon from "@mui/icons-material/ControlCamera";
import { Modal } from "@mui/material";

import { FaBars, FaSearch } from "react-icons/fa";

const client = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL + "camera/",
});

const Navbar = () => {
  const [searchActive, setSearchActive] = useState(false);

  const toggleSearch = () => {
    setSearchActive(!searchActive);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // set to lg breakpoint value
        setSearchActive(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  return (
    <>
      <div className="flex items-center justify-between sticky bg-slate-300 p-4 h-20 w-full">
        <FaBars
          className={`text-xl lg:hidden ${searchActive ? "hidden" : "block"}`}
          onClick={handleOpenSideNavbar}
        />
        <Link
          to="/"
          className={`font-extrabold text-xl tracking-wider text-slate-700 flex items-center ${
            searchActive ? "hidden" : "block"
          }`}
        >
          <ControlCameraIcon className="text-slate-700 mr-1" />
          SmartCam
        </Link>

        <FaSearch
          onClick={toggleSearch}
          className={`  lg:hidden ${searchActive ? "hidden" : "block"}`}
        />
        <SearchBar searchActive={searchActive} />
        <button
          class={`absolute top-0 right-0 mr-1 mt-1 text-lg text-gray-800 hover:text-red-600 focus:text-red-600 focus:outline-none ${
            searchActive ? "flex" : "hidden"
          }`}
          onClick={toggleSearch}
        >
          x
        </button>

        <div className="hidden lg:flex items-center justify-center gap-8">
          <a
            href="/signup"
            className="text-slate-700 hover:text-gray-900 font-medium text-base"
          >
            Sign Up
          </a>
          <a
            href="/login"
            className="text-slate-700 hover:text-gray-900 font-medium text-base"
          >
            Log In
          </a>
          <button
            onClick={handleOpen}
            className="bg-white py-2 px-4 border border-slate-600 rounded-md shadow-sm text-base font-medium text-slate-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
          >
            Submit a Webcam
          </button>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          className="fixed z-50 inset-0 overflow-y-auto"
          onClick={handleClose}
        >
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <button
                className="absolute right-0 top-0 mt-2 mr-2"
                onClick={handleClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700 hover:text-gray-900 transition-colors duration-200"
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
              <h2 className="text-xl font-bold mb-4">Submit a Webcam</h2>
              <form>
                <div className="mb-4">
                  <label
                    htmlFor="webcam-name"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Webcam Name
                  </label>
                  <input
                    type="text"
                    id="webcam-name"
                    name="webcam-name"
                    value={webcamName}
                    onChange={(e) => setWebcamName(e.target.value)}
                    className="border-2 border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="webcam-url"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Webcam URL
                  </label>
                  <input
                    type="text"
                    id="webcam-url"
                    name="webcam-url"
                    value={webcamUrl}
                    onChange={(e) => setWebcamUrl(e.target.value)}
                    className="border-2 border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <button
                  type="button"
                  onClick={SubmitWebcamHandler}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        open={openSideNavbar}
        onClose={handleCloseSideNavbar}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex">
          <div className="w-72 bg-slate-400 px-8 py-10 flex flex-col gap-8">
            <button
              onClick={handleCloseSideNavbar}
              className="text-2xl absolute top-2 right-2 text-white hover:text-gray-300 focus:outline-none"
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
            <a
              href="/signup"
              className="text-2xl font-bold tracking-wide cursor-pointer text-white hover:underline"
            >
              Sign Up
            </a>
            <a
              href="/login"
              className="text-2xl font-bold tracking-wide cursor-pointer text-white hover:underline"
            >
              Log In
            </a>
            <a
              href="/submit-webcam"
              className="text-2xl font-bold tracking-wide cursor-pointer text-white hover:underline"
            >
              Submit a Webcam
            </a>
            <a
              href="/about"
              className="text-2xl font-bold tracking-wide cursor-pointer text-white hover:underline"
            >
              About Us
            </a>
            <a
              href="/contact"
              className="text-2xl font-bold tracking-wide cursor-pointer text-white hover:underline"
            >
              Contact Us
            </a>
            <a
              href="/privacy-policy"
              className="text-2xl font-bold tracking-wide cursor-pointer text-white hover:underline"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Navbar;
