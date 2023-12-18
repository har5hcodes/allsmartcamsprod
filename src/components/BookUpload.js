import React, { useState } from "react";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import axios from "axios";

const BookUpload = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [link, setLink] = useState("");
  const [time, setTime] = useState(null);

  const handleBookSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("timeOfDay", selectedTime);
    formData.append("title", bookTitle);

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

    setLink("");
  };
  const handleLinkSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://backend.interviewblindspots.com/displaycode/fetchdata/", {
        key: link,
        timeOfDay: time,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const handleFileInputChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div>
      <form
        className="w-full max-w-lg mx-auto mb-16"
        onSubmit={handleBookSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="book-title"
          >
            Book Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="book-title"
            type="text"
            placeholder="Enter book title"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="time-picker"
          >
            Time
          </label>
          <TimePicker
            id="time-picker"
            className="w-full appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            showSecond={false}
            defaultValue={selectedTime}
            onChange={(value) => setSelectedTime(value)}
            allowEmpty={false}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="file-input"
          >
            File Input
          </label>
          <input
            className="appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            id="file-input"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileInputChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Upload Book
          </button>
        </div>
      </form>
      <form className="w-full max-w-lg mx-auto" onSubmit={handleLinkSubmit}>
        <div className="mb-4">
          <label htmlFor="link" className="block text-gray-700 font-bold mb-2">
            Link
          </label>
          <input
            id="link"
            type="text"
            placeholder="Enter link here"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="time-picker"
          >
            Time
          </label>
          <TimePicker
            id="time-picker"
            className="w-full appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            showSecond={false}
            defaultValue={time}
            onChange={(value) => setTime(value)}
            allowEmpty={false}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Upload Link
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookUpload;
