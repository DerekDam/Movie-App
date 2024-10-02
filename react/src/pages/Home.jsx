import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/banner/banner";
import MovieList from "../components/movieLists/MovieList";
import BestSeries from "../components/movieLists/bestSeries";
import { fetchMovies } from "../slicer/movieSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { popularMovies, topRated, airingToday, error } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="w-full h-full space-y-5">
      <Banner />
      <MovieList title={"POPULAR MOVIES"} data={popularMovies} />
      <MovieList title={"POPULAR TV SHOWS"} data={topRated} />
      <BestSeries
        title={"The Best Movies For You"}
        data={airingToday.slice(0, 12)}
      />
    </div>
  );
};

export default Home;
