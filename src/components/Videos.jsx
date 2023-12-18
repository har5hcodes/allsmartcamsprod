import React, { useState } from "react";

import { Loader, VideoCard } from "./";
import Footer from "./Footer";

const Videos = ({ videos }) => {
  return (
    <>
      {!videos?.length && (
        <h2 className="text-center text-gray-500 text-xl mt-4">
          No results found.
        </h2>
      )}

      {videos?.length && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-y-8 place-items-center ">
            {videos.map((item, idx) => {
              if (item.snippet.liveBroadcastContent !== "none") {
                return (
                  <div key={idx} className="col-span-1">
                    <VideoCard video={item} />
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Videos;
