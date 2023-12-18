import React, { useState } from "react";
import axios from "axios";

function FileUploader() {
  const [file, setFile] = useState(null);
  const [timeField, setTimeField] = useState("");
  const [titleField, setTitleField] = useState("");

  const [link, setLink] = useState("");
  const [timeLink, setTimeLink] = useState("");

  const handleTimeLinkChange = (event) => {
    setTimeLink(event.target.value);
  };
  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleUploadLink = () => {
    //For link, we do not need title field. Backend can fetch it for us.
    axios
      .post("https://backend.interviewblindspots.com/displaycode/fetchdata/", {
        key: link,
        timeOfDay: timeLink,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
    setLink("");
  };

  const handleTimeFieldChange = (event) => {
    setTimeField(event.target.value);
  };
  const handleTitleFieldChange = (event) => {
    setTitleField(event.target.value);
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    console.log("selected");
  };

  const handleUploadFile = () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("timeOfDay", timeField);
    formData.append("title", titleField);

    axios
      .post(
        "https://backend.interviewblindspots.com/displaycode/bookupload/",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data; boundary=" + formData._boundary,
          },
        }
      )
      .then((response) => {
        console.log("success");
      })
      .catch((error) => {
        // handle error
      });
  };

  return (
    <div className="m-5">
      <div className="mb-5 border border-gray-400 p-10">
        <div>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            className="mb-5 px-4 py-2 rounded-lg shadow-sm appearance-none bg-gray-100 border border-gray-400 hover:bg-gray-200 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
          />
        </div>
        <div>
          <label htmlFor="title" className="block text-gray-700 font-bold mb-1">
            Enter a title for the book:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={titleField}
            onChange={handleTitleFieldChange}
            className="px-4 py-2 rounded-lg shadow-sm appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
          />
          <label htmlFor="time" className="block text-gray-700 font-bold mb-1">
            Enter a time:
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={timeField}
            onChange={handleTimeFieldChange}
            className="px-4 py-2 rounded-lg shadow-sm appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
          />
        </div>

        <button
          onClick={handleUploadFile}
          className="p-2 m-2 mt-5 bg-indigo-200"
        >
          Upload
        </button>
      </div>
      <div className="mb-5 border border-gray-400 p-10">
        <div>
          <div>
            <label
              htmlFor="link"
              className="block text-gray-700 font-bold mb-2"
            >
              Enter URL:
            </label>
            <input
              type="text"
              id="link"
              name="link"
              value={link}
              onChange={handleLinkChange}
              className="border-solid border-2 border-indigo-200 mb-5"
            />
          </div>
          <div>
            <label
              htmlFor="time"
              className="block text-gray-700 font-bold mb-2"
            >
              Enter a time:
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={timeLink}
              onChange={handleTimeLinkChange}
              className="px-4 py-2 rounded-lg shadow-sm appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
            />
          </div>
        </div>
        <button
          onClick={handleUploadLink}
          className="p-2 m-2 mt-5 bg-indigo-200"
        >
          Add URL
        </button>
      </div>
    </div>
  );
}

export default FileUploader;
