import React, { useState } from "react";
import Navigation from "../components/header/Navigation";
import Footer from "../components/footer/Footer";
import { Outlet } from "react-router-dom";
import axios from "axios";
import MovieSearch from "../components/movieLists/movieSearch";

const Layout = () => {
  const [movieSearch, setMovieSearch] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (value) => {
    console.log("value: ", value);
    setMovieSearch([]);
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_KEY}`,
      },
    };

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=en-US&page=1`,
        options
      );
      const data = response.data;
      console.log("search results:", data);
      setMovieSearch(data.results);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  const resetSearch = () => {
    setMovieSearch([]);
    setSearchQuery("");
  };

  return (
    <div>
      <Navigation
        onSearch={handleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {movieSearch.length > 0 ? (
        <MovieSearch movieSearch={movieSearch} onResetSearch={resetSearch} />
      ) : (
        <main className="h-auto w-auto">
          <Outlet />
        </main>
      )}
      <Footer />
    </div>
  );
};

export default Layout;
