import React from "react";
import QuizGameViewModel from "./quizGame.viewmodel";
import { Modal } from "react-bootstrap";
import ScoreQuizGameModal from "./component/scoreQuizGameModal";
import CloseIcon from "@mui/icons-material/Close";

function QuizGame() {
  const {
    count,
    imgSign,
    questions,
    onChangeQuestion,
    showScore,
    summaries,
    handleHiddenModal,
  } = QuizGameViewModel();
  const styleBtnAns =
    "flex w-full border-gray-300 active:border-blue-600 border-2 rounded-3xl md:rounded-full items-center justify-center active:bg-blue-400 text-3xl md:text-6xl text-gray-600 py-2 2xl:w-[600px] shadow-md lg:shadow-xl lg:hover:bg-blue-200 lg:active:bg-blue-400 active:text-gray-100 rounded-gray-2";

  return (
    <>
      {/* Mobile and ipad */}
      <div className="lg:hidden w-full flex flex-col p-6 gap-y-8 md:gap-y-24">
        <div className="flex w-full justify-between">
          <h1 className="text-2xl md:text-4xl text-gray-600">
            เลือกให้ถูกต้อง
          </h1>
          <h1 className="text-2xl md:text-4xl text-gray-600">
            {count + 1} / 5
          </h1>
        </div>
        <div className="flex justify-center">
          <img
            src={imgSign?.[count]}
            className="w-60 md:w-96 rounded-full md:rounded-3xl border-2 border-gray-300 shadow-md"
          />
        </div>
        <div className="space-y-6 md:space-y-12 px-10 md:px-40">
          {questions?.[count].map((question, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onChangeQuestion(question.name)}
              className={styleBtnAns}
            >
              {question.name}
            </button>
          ))}
        </div>
      </div>

      {/* Computer */}
      <div className="hidden lg:flex flex-col p-10">
        <div className="flex w-full justify-between">
          <h1 className="text-2xl md:text-4xl text-gray-600">
            เลือกให้ถูกต้อง
          </h1>
          <div className="md:space-x-1">
            <h1 className="text-5xl text-gray-600">{count + 1} / 5</h1>
          </div>
        </div>
        <div className="grid grid-cols-3 p-28">
          <img
            src={imgSign?.[count]}
            className="w-full h-auto rounded-full md:rounded-3xl border-2 border-gray-300 shadow-2xl"
          />
          <div className="col-span-2 space-y-6 md:space-y-12 px-10 md:px-40">
            {questions?.[count].map((question, index) => (
              <button
                key={index}
                type="button"
                onClick={() => onChangeQuestion(question.name)}
                className={styleBtnAns}
              >
                {question.name}
              </button>
            ))}
          </div>
        </div>
      </div>

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
            <ScoreQuizGameModal summaries={summaries} />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default QuizGame;
