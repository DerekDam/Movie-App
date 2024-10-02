import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import YouTube from "react-youtube";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrailer, closeModal, openModal } from "../../slicer/trailerSlice";
import "./movieList.css";

const customStyles = {
  overlay: {
    position: "fixed",
    zIndex: 999,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    autoplay: 1,
  },
};

const MovieSearch = ({ movieSearch, onResetSearch, isMovie }) => {
  const dispatch = useDispatch();
  const { trailerKey, error, modalIsOpen, loading } = useSelector(
    (state) => state.trailers
  );

  const handleTrailer = (id) => {
    dispatch(fetchTrailer({ id, isMovie }));
    dispatch(openModal());
  };

  const resetSearch = () => {
    onResetSearch();
  };

  return (
    <div>
      <div className="search-results">
        <h2 className="text-2xl font-bold text-center my-4">
          Kết quả tìm kiếm
        </h2>
        <div className="flex lg:justify-end justify-center  mt-8 container mx-auto ">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={resetSearch}
          >
            Reset
          </button>
        </div>
        <ul className="grid grid-cols-4 gap-2 mt-10">
          {movieSearch.slice(0, 12).map((movie) => (
            <div
              key={movie.id}
              className="p-1 rounded image-item cursor-pointer"
              onClick={() => handleTrailer(movie.id)}
            >
              <img
                src={`${import.meta.env.VITE_IMG_URL}${movie.poster_path}`}
                alt={movie.title || "Poster phim"}
              />
            </div>
          ))}
        </ul>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => dispatch(closeModal())}
        style={customStyles}
        contentLabel="Trailer Modal"
        ariaHideApp={false}
      >
        {loading ? (
          <div>Đang tải...</div>
        ) : trailerKey ? (
          <YouTube videoId={trailerKey} opts={opts} />
        ) : error ? (
          <div className="text-black">{error}</div>
        ) : (
          <div className="text-black">Không có trailer nào.</div>
        )}
      </Modal>
    </div>
  );
};
MovieSearch.propTypes = {
  movieSearch: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string.isRequired,
      title: PropTypes.string,
    })
  ).isRequired,
  onResetSearch: PropTypes.func.isRequired,
  isMovie: PropTypes.bool,
};

MovieSearch.defaultProps = {
  isMovie: true,
};

export default MovieSearch;
