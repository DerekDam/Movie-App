import React from "react";

const footer = () => {
  return (
    <footer className="bg-yellow-500/85 text-white py-8 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-5xl uppercase font-black">movieon</h2>
            <p className="text-sm mt-2">
              Discover a world of movies and TV shows, curated just for you.
            </p>
          </div>    

          <div className="flex flex-row gap-5">
            <a href="/" className="text-black hover:text-gray-200 transition">
              Home
            </a>
            <a
              href="/movies"
              className="text-black hover:text-gray-200 transition"
            >
              Movies
            </a>
            <a
              href="/tv-shows"
              className="text-black hover:text-gray-200 transition"
            >
              TV Shows
            </a>
            <a
              href="/contact"
              className="text-black hover:text-gray-200 transition"
            >
              Contact Us
            </a>
          </div>
        </div>

        <div className="flex justify-center md:justify-end mt-6 space-x-4">
          <a href="#" className="text-black hover:text-white transition">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-black hover:text-white transition">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-black hover:text-white transition">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="text-black hover:text-white transition">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
        <div className="text-center text-black mt-6">
          <p>© 2024 Movieon. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};
export default footer;
