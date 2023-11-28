import React from "react";
import imageBorder from "./component/imageBorder.png";
import SimulationGameViewModel from "./simulationGame.viewmodel";
import { Modal } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import ScoreSimulationGameModel from "./component/scoreSimulationGameModal";

function SimulationGame() {
  const {
    answer,
    choices,
    statusChoice,
    userSelected,
    handelUserSelected,
    showScore,
    handleCloseModal,
    summary,
  } = SimulationGameViewModel();

  return (
    <>
      {/* mobile and ipad */}
      <div className="lg:hidden flex flex-col w-full h-screen items-center bg-white space-y-4 p-4">
        <h1 className="text-2xl md:text-4xl text-gray-600">เหตุการณ์จำลอง</h1>
        <div className="relative flex flex-col items-center w-[90%] h-auto">
          <img src={imageBorder} className="w-full md:w-[70%]" />
          <div className="absolute flex top-[5.5%] w-[80%] md:w-[60%] h-1/2">
            <video
              controls
              className="w-full rounded-xl md:rounded-2xl border-2 border-gray-600"
              src={answer ? answer.question : ""}
            />
          </div>
        </div>
        <h1 className="mt-5 text-xl md:text-4xl text-gray-600">
          เลือกคำศัพท์ตามหมวดหมู่
        </h1>
        <div className="flex flex-col w-full md:w-[90%] border-2 border-gray-400 rounded-xl md:rounded-3xl shadow-xl p-3 space-y-3 md:space-y-6">
          <span className="flex justify-end text-lg md:text-3xl text-gray-600">
            {userSelected.length}/2
          </span>
          <div className="grid grid-cols-3 gap-3">
            {choices &&
              choices.map((choice, index) => (
                <div
                  key={index}
                  onClick={() => handelUserSelected(choice.name, index)}
                  className={`${
                    statusChoice[index]
                      ? "border-blue-200 bg-blue-500"
                      : "border-gray-300"
                  } flex flex-col justify-between items-center rounded-xl border-2 cursor-pointer space-y-4 py-3 px-2`}
                >
                  <img
                    src={choice.image}
                    className="w-[90%] md:w-[85%] h-auto rounded-lg md:rounded-2xl"
                  />
                  <span
                    className={`${
                      statusChoice[index] ? "text-gray-50" : "text-gray-600"
                    } text-lg md:text-3xl`}
                  >
                    {choice.name}
                  </span>
                </div>
              ))}
          </div>
        </div>
        <div className="flex w-full h-10"></div>
      </div>

      {/* Computer */}
      <div className="hidden lg:flex flex-col w-full h-screen items-center bg-white space-y-10 p-4">
        <h1 className="text-4xl text-gray-600">เหตุการณ์จำลอง</h1>
        <div className="flex w-[90%] justify-between space-x-12 p-4">
          <div className="relative w-[50%] h-auto flex flex-col items-center">
            <img src={imageBorder} className="w-[70%]" />
            <div className="absolute flex top-[4.5%] w-[60%] h-1/2">
              <video
                controls
                className="w-full rounded-2xl border-3 border-gray-600"
                src={answer ? answer.question : ""}
              />
            </div>
          </div>
          <div className="w-[50%] p-4">
            <div className="flex flex-col border-2 border-gray-400 rounded-3xl shadow-xl p-10 space-y-6">
              <div className="flex justify-between">
                <h1 className="text-3xl text-gray-600">
                  เลือกคำศัพท์ตามหมวดหมู่
                </h1>
                <span className="text-3xl text-gray-600">
                  {userSelected.length}/2
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {choices &&
                  choices.map((choice, index) => (
                    <div
                      key={index}
                      onClick={() => handelUserSelected(choice.name, index)}
                      className={`${
                        statusChoice[index]
                          ? "border-3 border-blue-200 bg-blue-500"
                          : "border-2 border-gray-300"
                      } flex flex-col justify-between items-center rounded-3xl cursor-pointer space-y-4 py-3 px-2`}
                    >
                      <img
                        src={choice.image}
                        className="w-[85%] h-auto rounded-2xl"
                      />
                      <span
                        className={`${
                          statusChoice[index] ? "text-gray-50" : "text-gray-600"
                        } text-2xl`}
                      >
                        {choice.name}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <Modal show={showScore} onHide={handleCloseModal} className="modal-xl">
          <Modal.Header className="bg-gray-800 border-[2px] border-gray-400">
            <div className="flex w-full items-center justify-between">
              <h1 className=" text-gray-200">สรุปคะแนน</h1>
              <div
                onClick={handleCloseModal}
                className="text-gray-200 cursor-pointer text-2xl"
              >
                <CloseIcon />
              </div>
            </div>
          </Modal.Header>
          <Modal.Body>
            <ScoreSimulationGameModel summary={summary} />
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default SimulationGame;
