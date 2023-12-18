import React, { useState } from "react";
import { Link } from "react-router-dom";

const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("database");

  const onhandleSubmit = (e) => {
    e.preventDefault();
    console.log(searchTerm);
  };

  const handleRadioChange = (e) => {
    setSearchOption(e.target.value);
  };

  return (
    <form
      onSubmit={onhandleSubmit}
      className={`justify-center items-center ${
        props.searchActive ? "flex" : "hidden"
      } lg:flex`}
    >
      <input
        className="w-full h-10 px-3 rounded-l-lg border-t border-b border-l text-gray-800 border-gray-200 bg-white"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        <div className="flex items-center mx-2 text-xs mb-2">
          <input
            type="radio"
            id="databaseSearch"
            name="searchOption"
            value="database"
            checked={searchOption === "database"}
            onChange={handleRadioChange}
            className="mr-1"
          />
          <label htmlFor="databaseSearch">Database</label>
        </div>

        <div className="flex items-center mx-2 text-xs">
          <input
            className="mr-1"
            type="radio"
            id="youtubeSearch"
            name="searchOption"
            value="youtube"
            checked={searchOption === "youtube"}
            onChange={handleRadioChange}
          />
          <label htmlFor="youtubeSearch" className="mr-2">
            Youtube
          </label>
        </div>
      </div>

      <Link to={`/search/${searchTerm}/${searchOption}`}>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-r-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray disabled:opacity-25 transition ease-in-out duration-150"
        >
          Search
        </button>
      </Link>
    </form>
  );
};

export default SearchBar;
