import React from "react";
import { Link } from "react-router-dom";
import gamePictures from "../../gamePictures/gamePictures";

function SelectGames() {
  const Games = [
    {
      name: "เกมจับคู่",
      imgGame: gamePictures.matching,
    },
    {
      name: "เกมตอบคำถาม",
      imgGame: gamePictures.question,
    },
    {
      name: "เกมสะกดคำ",
      imgGame: gamePictures.spellingGame,
    },
    {
      name: "เกมจับผิดภาพ",
      imgGame: gamePictures.differenceGame,
    },
  ];

  const simulationGame = {
    name: "เกมจำลองสถานการณ์",
    imgGame: gamePictures.simulationGame,
  };

  return (
    <>
      <div className="flex flex-col w-full">
        {/* Mobile and ipad */}
        <div className="lg:hidden flex flex-col items-center px-6 py-4 md:mt-4 space-y-6 md:space-y-10">
          <h1 className="text-gray-600 text-2xl md:text-4xl font-bold ">เกม</h1>
          {/* Other Games */}
          {Games &&
            Games.map((game, index) => {
              return (
                <Link
                  to="/games/category"
                  key={index}
                  state={{ gameName: game.name }}
                  className="flex h-32 md:h-44 space-x-6 md:space-x-12 p-3 shadow-md md:shadow-lg border-[2px] hover:bg-blue-200 active:bg-blue-300 rounded-2xl w-full cursor-pointer no-underline"
                >
                  <img
                    src={game.imgGame}
                    alt=""
                    className="w-28 md:w-40 rounded-lg md:rounded-xl"
                  />
                  <div className="flex w-full items-center">
                    <h1 className="text-gray-600 text-xl md:text-3xl">
                      {game.name}
                    </h1>
                  </div>
                </Link>
              );
            })}

          {/* Simulation Game */}
          <Link
            to="/games/category/simulationGame"
            className="flex h-32 md:h-44 space-x-6 md:space-x-12 p-3 shadow-md md:shadow-lg border-[2px] hover:bg-blue-200 active:bg-blue-300 rounded-2xl w-full cursor-pointer no-underline"
          >
            <img
              src={simulationGame.imgGame}
              alt=""
              className="w-28 md:w-40 rounded-lg md:rounded-xl"
            />
            <div className="flex w-full items-center">
              <h1 className="text-gray-600 text-xl md:text-3xl">
                {simulationGame.name}
              </h1>
            </div>
          </Link>
        </div>

        {/* Computer */}
        <div className="hidden lg:flex flex-col items-center px-6 lg:px-14 py-4 lg:space-y-10">
          <h1 className="text-gray-600 font-bold">เกม</h1>
          <div className="w-full grid grid-cols-4 2xl:grid-cols-5 gap-8 px-4">
            {/* Other Games */}
            {Games &&
              Games.map((game, index) => {
                return (
                  <div key={index} className="flex flex-col items-center">
                    <h1 className="text-xl xl:text-2xl text-gray-600">
                      {game.name}
                    </h1>
                    <Link
                      to="/games/category"
                      state={{ gameName: game.name }}
                      className="flex h-60 xl:h-72 2xl:h-80 border-[2px] p-3 rounded-3xl shadow-xl hover:bg-blue-200 active:bg-blue-300 cursor-pointer"
                    >
                      <img
                        src={game.imgGame}
                        alt=""
                        className="w-full rounded-2xl"
                      />
                    </Link>
                  </div>
                );
              })}

            {/* Simulation Game */}
            <div className="flex flex-col items-center">
              <h1 className="text-xl xl:text-2xl text-gray-600">
                {simulationGame.name}
              </h1>
              <Link
                to="/games/category/simulationGame"
                className="flex h-60 xl:h-72 2xl:h-80 border-[2px] p-3 rounded-3xl shadow-xl hover:bg-blue-200 active:bg-blue-300 cursor-pointer"
              >
                <img
                  src={simulationGame.imgGame}
                  alt=""
                  className="w-full rounded-2xl"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full h-10"></div>
      </div>
    </>
  );
}

export default SelectGames;
