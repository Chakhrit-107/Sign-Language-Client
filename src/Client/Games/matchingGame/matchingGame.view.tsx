import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import MatchingGameViewModel from "./matchingGame.viewmodel";
import ScoreMatchingGameModal from "./component/scoreMatchingGameModal";
import Loading from "../../../components/loading";

function MatchingGame() {
  const {
    statusImg,
    statusAns,
    settingPositionQuestion,
    settingPositionAnswer,
    line,
    imagesQuiz,
    vAnswer,
    showScore,
    handleHiddenModal,
    summaries,
  } = MatchingGameViewModel();

  return (
    <>
      {imagesQuiz === undefined ? (
        <Loading massage="กำลังโหลดข้อมูล" />
      ) : (
        <div className="flax w-full h-screen">
          <div
            id="header"
            className="flex flex-col w-full justify-center items-center p-6"
          >
            <h1 className="text-2xl md:text-4xl text-gray-600">
              เลือกให้ถูกต้อง
            </h1>
          </div>
          <div className="absolute w-full">
            {statusImg.some((value) => value === true) ||
            statusAns.some((value) => value === true) ? (
              <span className="absolute -top-5 text-sm left-[7%] md:left-[30%] lg:left-[40%] xl:left-[43%]">
                ( ยกเลิกการจับคู่โดยเลือกรูปและคำศัพท์ที่ต้องการยกเลิก )
              </span>
            ) : null}
          </div>

          <div className="relative w-full h-[90%] lg:h-[70%] xl:h-[50%] bottom-0 mt-4">
            {line ? <img src={line} className="absolute z-0" /> : null}
            <div
              id="divQ1"
              onClick={() =>
                settingPositionQuestion("divQ1", 0, imagesQuiz[0].nameCorrect)
              }
              className={`${
                statusImg[0]
                  ? "bg-blue-500 border-3 border-blue-300"
                  : "bg-gray-50 border-2 border-gray-300"
              } z-10 absolute p-2 flex w-[30%] xl:w-[20%] 2xl:w-[15%] h-[20%] lg:h-[35%] xl:h-[45%] left-[10%] top-[0%] rounded-2xl cursor-pointer shadow-xl`}
            >
              <img
                src={
                  imagesQuiz && imagesQuiz.length > 0 ? imagesQuiz[0].image : ""
                }
                className="w-full rounded-xl"
              />
            </div>
            <div
              id="divQ2"
              onClick={() =>
                settingPositionQuestion("divQ2", 1, imagesQuiz[1].nameCorrect)
              }
              className={`${
                statusImg[1]
                  ? "bg-blue-500 border-3 border-blue-300"
                  : "bg-gray-50 border-2 border-gray-300"
              } z-10 absolute p-2 flex w-[30%] xl:w-[20%] 2xl:w-[15%] h-[20%] lg:h-[35%] xl:h-[45%] left-[10%] top-[30%] lg:top-[40%] xl:top-[50%] rounded-2xl shadow-xl cursor-pointer`}
            >
              <img
                src={
                  imagesQuiz && imagesQuiz.length > 0 ? imagesQuiz[1].image : ""
                }
                className="w-full rounded-xl"
              />
            </div>
            <div
              id="divQ3"
              onClick={() =>
                settingPositionQuestion("divQ3", 2, imagesQuiz[2].nameCorrect)
              }
              className={`${
                statusImg[2]
                  ? "bg-blue-500 border-3 border-blue-300"
                  : "bg-gray-50 border-2 border-gray-300"
              } z-10 absolute p-2 flex w-[30%] xl:w-[20%] 2xl:w-[15%] h-[20%] lg:h-[35%] xl:h-[45%] left-[10%] top-[60%] lg:top-[80%] xl:top-[100%] rounded-2xl shadow-xl cursor-pointer`}
            >
              <img
                src={
                  imagesQuiz && imagesQuiz.length > 0 ? imagesQuiz[2].image : ""
                }
                className="w-full rounded-xl"
              />
            </div>
            <div
              id="divQ4"
              onClick={() =>
                settingPositionQuestion("divQ4", 3, imagesQuiz[3].nameCorrect)
              }
              className={`${
                statusImg[3]
                  ? "bg-blue-500 border-3 border-blue-300"
                  : "bg-gray-50 border-2 border-gray-300"
              } z-10 absolute p-2 flex w-[30%] xl:w-[20%] 2xl:w-[15%] h-[20%] lg:h-[35%] xl:h-[45%] left-[10%] top-[90%] lg:top-[120%] xl:top-[150%] rounded-2xl shadow-xl cursor-pointer`}
            >
              <img
                src={
                  imagesQuiz && imagesQuiz.length > 0 ? imagesQuiz[3].image : ""
                }
                className="w-full rounded-xl"
              />
            </div>
            <div
              id="divA1"
              onClick={() => settingPositionAnswer("divA1", 0, vAnswer[0].name)}
              className={`${
                statusAns[0]
                  ? "bg-blue-500 border-3 border-blue-300"
                  : "bg-gray-50 border-2 border-gray-300"
              } z-10 absolute flex w-[30%] h-[12%] xl:h-[40%] 2xl:w-[15%] right-[10%] top-[0%] rounded-2xl shadow-xl cursor-pointer items-center justify-center`}
            >
              <h1
                className={`${
                  statusAns[0] ? "text-gray-50" : "text-gray-600"
                } `}
              >
                {vAnswer && vAnswer.length > 0 ? vAnswer[0].name : ""}
              </h1>
            </div>
            <div
              id="divA2"
              onClick={() => settingPositionAnswer("divA2", 1, vAnswer[1].name)}
              className={`${
                statusAns[1]
                  ? "bg-blue-500 border-3 border-blue-300"
                  : "bg-gray-50 border-2 border-gray-300"
              } z-10 absolute flex w-[30%] h-[12%] xl:h-[40%] 2xl:w-[15%] right-[10%] top-[30%] lg:top-[40%] xl:top-[50%] rounded-2xl shadow-xl cursor-pointer items-center justify-center`}
            >
              <h1
                className={`${
                  statusAns[1] ? "text-gray-50" : "text-gray-600"
                } `}
              >
                {vAnswer && vAnswer.length > 0 ? vAnswer[1].name : ""}
              </h1>
            </div>
            <div
              id="divA3"
              onClick={() => settingPositionAnswer("divA3", 2, vAnswer[2].name)}
              className={`${
                statusAns[2]
                  ? "bg-blue-500 border-3 border-blue-300"
                  : "bg-gray-50 border-2 border-gray-300"
              } z-10 absolute flex w-[30%] h-[12%] 2xl:w-[15%] xl:h-[40%] right-[10%] top-[60%] lg:top-[80%] xl:top-[100%] rounded-2xl shadow-xl cursor-pointer items-center justify-center`}
            >
              <h1
                className={`${
                  statusAns[2] ? "text-gray-50" : "text-gray-600"
                } `}
              >
                {vAnswer && vAnswer.length > 0 ? vAnswer[2].name : ""}
              </h1>
            </div>
            <div
              id="divA4"
              onClick={() => settingPositionAnswer("divA4", 3, vAnswer[3].name)}
              className={`${
                statusAns[3]
                  ? "bg-blue-500 border-3 border-blue-300"
                  : "bg-gray-50 border-2 border-gray-300"
              } z-10 absolute flex w-[30%] 2xl:w-[15%] h-[12%] xl:h-[40%] right-[10%] top-[90%] lg:top-[120%] xl:top-[150%] rounded-2xl shadow-xl cursor-pointer items-center justify-center`}
            >
              <h1
                className={`${
                  statusAns[3] ? "text-gray-50" : "text-gray-600"
                } `}
              >
                {vAnswer && vAnswer.length > 0 ? vAnswer[3].name : ""}
              </h1>
            </div>
          </div>
        </div>
      )}

      {showScore && (
        <Modal show={true} onHide={handleHiddenModal} className="modal-xl">
          <Modal.Header className="bg-gray-800 border-[2px] border-gray-400">
            <div className="flex w-full items-center justify-between">
              <h1 className=" text-gray-200">สรุปคะแนน</h1>
              <div
                onClick={() => window.location.reload()}
                className="text-gray-200 cursor-pointer text-2xl"
              >
                <CloseIcon />
              </div>
            </div>
          </Modal.Header>
          <Modal.Body>
            <ScoreMatchingGameModal summaries={summaries} />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default MatchingGame;
