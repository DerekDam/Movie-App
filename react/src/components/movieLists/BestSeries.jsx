import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { fetchTrailer, closeModal } from "../../slicer/trailerSlice";
import YouTube from "react-youtube";
import { useDispatch, useSelector } from "react-redux";

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

const BestSeries = ({ title, data, isMovie }) => {
  const dispatch = useDispatch();
  const { trailerKey, error, modalIsOpen, loading } = useSelector(
    (state) => state.movies
  );

  const handleTrailer = (id) => {
    dispatch(fetchTrailer({ id, isMovie }));
    dispatch({ type: "trailers/openModal" });
  };

  return (
    <div className="w-full h-full container mx-auto space-y-4 relative">
      <div className="text-white text-5xl font-black">{title}</div>
      <div className="flex flex-wrap justify-center items-center gap-3 w-full h-full ">
        {data?.map((item) => (
          <div
            key={item.id}
            className="rounded-md w-[200px] h-[300px] cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => handleTrailer(item.id)}
          >
            <img
              src={`${import.meta.env.VITE_IMG_URL}${item.poster_path}`}
              alt={item.title || "Series Poster"}
              className="image-item object-cover rounded-md"
            />
          </div>
        ))}

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => dispatch(closeModal())}
          style={customStyles}
          contentLabel="Trailer Modal"
          ariaHideApp={false}
        >
          {loading ? (
            <div className="text-black">Đang tải trailer...</div>
          ) : trailerKey ? (
            <YouTube videoId={trailerKey} opts={opts} />
          ) : error ? (
            <div className="text-black">{error}</div>
          ) : (
            <div className="text-black">Không có trailer nào.</div>
          )}
        </Modal>
      </div>
    </div>
  );
};

BestSeries.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string.isRequired,
      title: PropTypes.string,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

BestSeries.defaultProps = {
  isMovie: true,
};

export default BestSeries;
