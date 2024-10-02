import React from "react";
import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./movieList.css";
import Modal from "react-modal";
import YouTube from "react-youtube";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrailer, closeModal } from "../../slicer/trailerSlice";

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

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 10,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 7,
  },
  tablet: {
    breakpoint: { max: 1200, min: 600 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 2,
  },
};

const MovieList = ({ title, data, isMovie }) => {
  const dispatch = useDispatch();
  const { trailerKey, error, modalIsOpen, loading } = useSelector(
    (state) => state.trailers
  );

  const handleTrailer = (id) => {
    dispatch(fetchTrailer({ id, isMovie }));
    dispatch({ type: "trailers/openModal" });
  };

  return (
    <div className="w-full h-full">
      <div className="text-white w-auto h-auto space-y-4">
        <div className="text-4xl uppercase font-italic container mx-auto">
          {title}
        </div>
        <div className="flex justify-center items-center w-full h-full border-4 border-yellow-600 border-x-0">
          <Carousel
            responsive={responsive}
            infinite={true}
            draggable={false}
            className="w-full h-auto rounded-sm overflow-hidden shadow-lg"
          >
            {data?.map((item) => (
              <div
                key={item.id}
                className="px-1 py-2"
                onClick={() => handleTrailer(item.id)}
              >
                <img
                  className="image-item"
                  src={`${import.meta.env.VITE_IMG_URL}${item.poster_path}`}
                  alt={item.title || "Poster"}
                />
              </div>
            ))}
          </Carousel>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => dispatch(closeModal())}
            style={customStyles}
            contentLabel="Trailer Modal"
            shouldCloseOnOverlayClick={true}
          >
            {loading ? (
              <div>Loading...</div>
            ) : trailerKey ? (
              <YouTube videoId={trailerKey} opts={opts} />
            ) : error ? (
              <div className="text-black">{error}</div>
            ) : (
              <div className="text-black">No trailer available.</div>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
};

MovieList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string.isRequired,
      title: PropTypes.string,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
  isMovie: PropTypes.bool,
};

MovieList.defaultProps = {
  isMovie: true,
};

export default MovieList;
