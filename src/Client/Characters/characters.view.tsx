import React from "react";
import Consonants from "./component/consonants.png";
import Vowels from "./component/vowels.png";

function Characters() {
  return (
    <>
      <div className="w-full h-screen bg-white">
        <div className="flex flex-col items-center px-2 lg:px-16 py-8 space-y-24">
          <div className="flex flex-col lg:w-[70%] items-center space-y-4">
            <h1 className="text-gray-600 text-xl font-bold md:text-2xl lg:text-3xl">
              พยัญชนะไทย
            </h1>
            <img
              src={Consonants}
              alt="Consonants"
              className="w-[90%] shadow-2xl"
            />
          </div>
          <div className="flex flex-col lg:w-[70%] items-center space-y-4">
            <h1 className="text-gray-600 text-xl font-bold md:text-2xl lg:text-3xl">
              สระและวรรณยุกต์ไทย
            </h1>
            <img src={Vowels} alt="Vowels" className="w-[90%] shadow-2xl" />
          </div>
        </div>
        <div className="w-full h-10"></div>
      </div>
    </>
  );
}

export default Characters;
