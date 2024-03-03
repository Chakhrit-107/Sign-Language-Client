import React, { useState } from "react";
import SpellingGameViewModel from "./spellingGame.viewmodel";
import { escapeLeadingUnderscores } from "typescript";
import Loading from "../../../components/loading";

function SpellingGame() {
  const {
    statusBtn,
    userSelect,
    handleSelectCharacter,
    imgQuestion,
    svCorrect,
    svQuestion,
  } = SpellingGameViewModel();
  return (
    <>
      {imgQuestion === undefined ? (
        <Loading massage="กำลังโหลดข้อมูล" />
      ) : (
        <>
          {/* Mobile and ipad */}
          <div className="lg:hidden flex flex-col items-center space-y-8 w-full p-6">
            <div className="flex w-full justify-center">
              <h1 className="text-2xl md:text-4xl text-gray-600">
                สะกดคำจากรูป
              </h1>
            </div>
            <div className="flex flex-col w-52 md:w-1/3">
              <img
                src={imgQuestion}
                className="rounded-full border-gray-100 shadow-2xl"
              />
            </div>
            <div>
              <div
                className={`grid ${
                  svCorrect.length === 3 ? "grid-cols-3" : "grid-cols-4"
                } gap-4 rounded-xl justify-items-center p-4`}
              >
                {svCorrect.map((_, index) => (
                  <div
                    key={index}
                    className="flex justify-center items-center border-2 rounded-xl w-14 h-14 shadow-md"
                  >
                    {statusBtn && (
                      <h1 className="text-gray-600 text-xl">
                        {userSelect[index]}
                      </h1>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center justify-center mt-4">
                <h3 className="text-gray-600">เลือกตัวอักษรต่อไปนี้</h3>
                <div className="flex flex-col items-center">
                  {statusBtn.some((value) => value) && (
                    <span className="text-gray-500 text-sm">
                      (กดอีกครั้งเพื่อยกเลิกการเลือกตัวอักษร)
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-4 w-full rounded-xl p-4">
                  {svQuestion.map((separate, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelectCharacter(separate, index)}
                      className={`flex justify-center border-2 rounded-xl py-2 px-4 active:bg-blue-400 cursor-pointer shadow-md ${
                        statusBtn[index]
                          ? "bg-blue-400 border-blue-600"
                          : "bg-white"
                      }`}
                    >
                      <h1
                        className={`text-gray-600 text-2xl ${
                          statusBtn[index] && "text-white"
                        }`}
                      >
                        {separate}
                      </h1>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Computer */}
          <div className="hidden lg:flex flex-col items-center space-y-8 w-full p-6">
            <div className="flex w-full justify-center">
              <h1 className="text-4xl text-gray-600">สะกดคำจากรูป</h1>
            </div>
            <div className="flex justify-between items-center w-full px-36 space-x-36">
              <div className="flex flex-col items-center w-full">
                <img
                  src={imgQuestion}
                  className="rounded-full border-gray-100 shadow-2xl w-[80%]"
                />
              </div>
              <div className="w-full ">
                <div
                  className={`grid ${
                    svCorrect.length === 3 ? "grid-cols-3" : "grid-cols-4"
                  } gap-4 rounded-xl justify-items-center p-4`}
                >
                  {svCorrect.map((_, index) => (
                    <div
                      key={index}
                      className="flex justify-center items-center border-2 rounded-xl w-14 h-14 shadow-md"
                    >
                      {statusBtn && (
                        <h1 className="text-gray-600 text-xl">
                          {userSelect[index]}
                        </h1>
                      )}
                    </div>
                  ))}
                </div>
                <div className="hidden lg:flex flex-col items-center justify-center mt-10">
                  <h3 className="text-gray-600">เลือกตัวอักษรต่อไปนี้</h3>
                  <div className="flex flex-col items-center">
                    {statusBtn.some((value) => value) && (
                      <span className="text-gray-500 text-sm">
                        ( กดอีกครั้งเพื่อยกเลิกการเลือกตัวอักษร )
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-4 gap-4 w-full rounded-xl p-4">
                    {svQuestion.map((separate, index) => (
                      <div
                        key={index}
                        onClick={() => handleSelectCharacter(separate, index)}
                        className={`flex justify-center border-2 rounded-xl py-2 px-4 active:bg-blue-400 cursor-pointer shadow-md ${
                          statusBtn[index]
                            ? "bg-blue-400 border-blue-600"
                            : "hover:bg-blue-200"
                        }`}
                      >
                        <h1
                          className={`text-gray-600 text-2xl ${
                            statusBtn[index] && "text-white"
                          }`}
                        >
                          {separate}
                        </h1>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default SpellingGame;
