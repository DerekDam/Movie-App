import React from "react";
import "./Banner.css";
import banner from "../../assets/images/banner.jpg";

const Banner = () => {
  return (
    <div className="w-full h-full">
      <div className="w-auto h-auto text-white gap-5">
        <div className="absolute bg-black/5 top-0 left-0 w-full h-full" />
        <div className="w-full h-full">
          <img src={banner} alt="Banner" />
        </div>
      </div>
    </div>
  );
};


export default Banner;
