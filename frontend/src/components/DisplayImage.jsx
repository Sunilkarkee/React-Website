import React from "react";
import { IoClose } from "react-icons/io5";

const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <div className="fixed top-0 bottom-0 right-0  left-0 flex justify-center items-center">
      <div className="bg-white shadow-lg p-2 rounded max-w-5xl mx-auto ">

        <div className=" relative flex group justify-center w-[80vh] h-[80vh]">
          <div
            className="absolute  hidden -top-1 -right-1 hover:text-white hover:bg-Orange2 rounded-full text-2xl cursor-pointer  text-black  z-10 group-hover:block"
            onClick={onClose}
          >
            <IoClose />
          </div>
          <img src={imgUrl} className="h-full w-auto p-3 " />
        </div>

      </div> 
    </div>
  );
};

export default DisplayImage;
