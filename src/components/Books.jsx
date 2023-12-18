import React, { useState } from "react";

import { Loader, BookCard } from "./";
import Footer from "./Footer";

const Books = ({ books }) => {
  return (
    <>
      {!books?.length && (
        <h2 className="text-center text-gray-500 text-xl mt-4">
          No results found.
        </h2>
      )}

      {books?.length && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-y-8 place-items-center ">
            {books.map((item, idx) => {
                return (
                  <div key={idx} className="col-span-1">
                    <BookCard book={item} />
                  </div>
                );
            })}
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Books;
