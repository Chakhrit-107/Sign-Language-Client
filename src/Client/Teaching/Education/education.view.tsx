import React from "react";
import EducationViewModal from "./education.viewmodel";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function Education() {
  const {
    vocabulary,
    imgNormal,
    imgSign,
    videoSign,
    characters,
    vocabularyInput,
    foundVocabulary,
  } = EducationViewModal();

  return (
    <>
      {vocabularyInput || vocabulary ? (
        <div className="block w-full h-screen bg-white space-y-8 md:space-y-12">
          {/* mobile and ipad */}
          <div className="xl:hidden flex flex-col items-center bg-white pt-5 md:pt-10 gap-y-8 md:gap-y-14">
            <div className="flex flex-col gap-y-5 items-center">
              <h1 className="text-gray-600 text-[35px] md:text-[45px]">
                {vocabularyInput ? vocabularyInput.name : vocabulary}
              </h1>
              <img
                src={vocabularyInput ? vocabularyInput.img_normal : imgNormal}
                className="w-52 h-auto md:w-[450px] rounded-3xl border-[2px] border-gray-400 shadow-2xl"
              />
            </div>
            <div className="w-1/2 xl:w-1/4 h-auto">
              <video
                autoPlay
                muted={true}
                loop
                className="w-[100%] h-[100%] shadow-2xl rounded-3xl border-[2px] border-gray-400"
                src={vocabularyInput ? vocabularyInput.video : videoSign}
              />
            </div>
            <div className="block space-y-2 md:space-y-4 w-72 md:w-[600px] h-auto ">
              <h1 className="md:text-3xl text-gray-600">ท่าภาษามือ</h1>
              <div className="flex flex-col items-center">
                <img
                  src={
                    vocabularyInput
                      ? vocabularyInput.img_sign_language
                      : imgSign
                  }
                  className="w-full md:w-[80%] border-[2px] border-gray-400 shadow-2xl rounded-3xl"
                />
              </div>
            </div>
            <div className="block space-y-2 md:space-y-4 w-72 md:w-[600px] h-auto">
              <h1 className="md:text-3xl text-gray-600">ตัวสะกด</h1>
              <div className="border-[2px] border-gray-400 rounded-3xl p-3 shadow-2xl space-y-8">
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                  {characters.map((character, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-col items-center py-2 justify-between border-[2px] rounded-xl md:rounded-2xl shadow-md"
                      >
                        <div className="flex flex-col w-full items-center no-underline text-gray-600">
                          <div className="w-full p-2 h-[120px] md:h-[140px] md:w-[140px]">
                            <img
                              src={character.character_img}
                              alt="categories"
                              className="w-full max-h-[104px] rounded-xl"
                            />
                          </div>
                          <div className="flex justify-center w-full text-xl md:text-2xl px-3">
                            <h1 className="text-xl md:text-2xl text-gray-600">
                              {character.character_text}
                            </h1>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-center">
                  <h1 className="border-[2px] rounded-xl py-2 px-14 text-gray-600">
                    {vocabularyInput ? vocabularyInput.name : vocabulary}
                  </h1>
                </div>
              </div>
            </div>
          </div>

          {/* computer */}
          <div className="hidden xl:flex flex-col items-center bg-white gap-y-14">
            <h1 className="text-gray-600 text-[35px] md:text-[45px]">
              {vocabularyInput ? vocabularyInput.name : vocabulary}
            </h1>
            <div className="w-[70%] flex space-x-24">
              <div className="w-[40%] h-auto flex">
                <img
                  src={vocabularyInput ? vocabularyInput.img_normal : imgNormal}
                  className="w-full rounded-3xl border-[2px] border-gray-400 shadow-2xl"
                />
              </div>
              <div className="w-[60%] flex flex-col space-y-12">
                <div className="w-full flex justify-between border-[2px] border-gray-400 rounded-3xl shadow-xl p-10">
                  <div className="w-[60%] flex flex-col space-y-4">
                    <h1 className="text-2xl text-gray-600">รูปท่าภาษามือ</h1>
                    <div className="w-full h-auto">
                      <img
                        src={
                          vocabularyInput
                            ? vocabularyInput.img_sign_language
                            : imgSign
                        }
                        className="w-[70%] border-[2px] border-gray-400 shadow-xl rounded-3xl"
                      />
                    </div>
                  </div>
                  <div className="w-[40%] flex flex-col space-y-4">
                    <h1 className="text-2xl text-gray-600">วิดีโอท่าภาษามือ</h1>
                    <div className="w-full h-auto">
                      <video
                        autoPlay
                        muted={true}
                        loop
                        className="w-[100%] border-[2px] border-gray-400 shadow-xl rounded-3xl"
                        src={
                          vocabularyInput ? vocabularyInput.video : videoSign
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[70%] flex flex-col items-center border-[2px] border-gray-400 rounded-3xl shadow-xl p-12 space-y-10">
              <h1 className="text-3xl text-gray-600">ตัวสะกด</h1>
              <div className="w-full grid grid-cols-7 gap-3">
                {characters.map((character, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center py-2 justify-between border-[2px] rounded-2xl shadow-md"
                    >
                      <div className="flex flex-col w-full items-center no-underline text-gray-600">
                        <div className="h-[140px] w-[140px] p-3">
                          <img
                            src={character.character_img}
                            alt="categories"
                            className="w-full max-h-[104px] rounded-xl"
                          />
                        </div>
                        <div className="flex justify-center w-full text-2xl px-3">
                          <h1 className="text-2xl text-gray-600">
                            {character.character_text}
                          </h1>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-center">
                <h1 className="border-[2px] rounded-xl py-2 px-14 text-gray-600 text-3xl">
                  {vocabularyInput ? vocabularyInput.name : vocabulary}
                </h1>
              </div>
            </div>
          </div>
          <div className="w-full h-10"></div>
        </div>
      ) : foundVocabulary === false ? (
        <div className="flex flex-col h-[500px] items-center justify-center space-y-5">
          <h1 className="text-gray-600">ไม่พบข้อมูล</h1>
          <Link to="/">
            <button type="button" className="btn btn-outline-primary">
              กลับ
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col h-[500px] items-center justify-center space-y-5">
          <h1 className="text-gray-600">กำลังค้นหาคำศัพท์</h1>
        </div>
      )}
    </>
  );
}

export default Education;
