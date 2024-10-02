import React, { useState } from "react";
import { MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/outline";
import "./Nav.css";
import PropTypes from "prop-types";

const Navigation = ({ onSearch }) => {
  const [isSearch, setIsSearch] = useState("");
  console.log("Search:", onSearch);
  console.log("isSearch:", isSearch);

  const handleSearchClick = () => {
    if (isSearch.trim()) {
      onSearch(isSearch);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className="h-auto w-full text-slate-300 px-4 md:px-12 shadow-md relative lg:absolute lg:mb-0 z-50 mb-5">
      <div className="py-2 flex flex-col md:flex-col lg:flex-row  justify-between items-center">
        <div className="uppercase text-white text-3xl md:text-5xl font-bold">
          movieon
        </div>
        <div className="hidden md:flex justify-center items-center">
          <ul className="flex text-lg md:text-xl gap-2">
            <li className="nav-li">Movie</li>
            <li className="nav-li">Series</li>
            <li className="nav-li">TV Shows</li>
            <li className="nav-li">Contact Us</li>
          </ul>
        </div>
        <div className="flex items-center space-x-4 md:space-x-8 h-auto w-auto mt-2 md:mt-0">
          <div className="flex gap-1 justify-between items-center">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 placeholder-black rounded-md p-1 block text-gray-800 text-md bg-transparent border border-gray-800 focus:outline-none"
              value={isSearch}
              onChange={(e) => setIsSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Search movies"
            />
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-800 cursor-pointer"
              aria-hidden="true"
              type="search"
              onClick={handleSearchClick}
            />
          </div>
        </div>
      </div>
      <div className="md:hidden flex justify-center mt-2">
        <ul className="flex text-lg gap-2">
          <li className="nav-li">Movie</li>
          <li className="nav-li">Series</li>
          <li className="nav-li">TV Shows</li>
          <li className="nav-li">Contact Us</li>
        </ul>
      </div>
    </div>
  );
};

Navigation.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Navigation;
