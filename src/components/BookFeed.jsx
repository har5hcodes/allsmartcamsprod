import React, { useEffect, useState } from "react";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Books } from "./";
import { BookUpload } from "./";
//import Carousel from "./Carousel";

const BookFeed = () => {
  const [selectedCategory] = useState("live webcam");
  const [books, setBooks] = useState(null);

  useEffect(() => {
    setBooks(null);
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data) => {
      //setBooks(data.items);
    });

    fetch(process.env.REACT_APP_BACKEND_URL + "books/")
      .then((res) => res.json())
      .then((data) => {
        console.log("data items is ");
        console.log(data.items);
        setBooks(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [selectedCategory]);

  return (
    <>
      <div className="h-screen grid grid-rows-3 gap-8">
        <div className="row-span-2">
          {/* <Carousel /> */}
          <BookUpload />
        </div>
      </div>
      <div className="h-screen grid grid-rows-3 gap-8">
        <div className="row-span-1">
          <Books books={books} />
        </div>
      </div>


    </>
  );
};

export default BookFeed;
