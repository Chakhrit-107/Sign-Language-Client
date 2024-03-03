import React from "react";
import DifferenceGameViewModel from "./differenceGame.viewmodel";
import { Modal } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import ScoreDifferenceGameModal from "./component/scoreDifferenceGameModal";
import Loading from "../../../components/loading";

function DifferenceGame() {
  const {
    vSet1,
    vSet2,
    statusBtn,
    userSelected,
    handleHiddenModal,
    handleSelectAnswer,
    showScore,
    summaries,
  } = DifferenceGameViewModel();

  return (
    <>
      {vSet1 === undefined && vSet2 === undefined ? (
        <Loading massage="กำลังโหลดข้อมูล" />
      ) : (
        <>
          {/* Mobile */}
          <div className="md:hidden w-full flex flex-col p-6 gap-y-8">
            <div className="flex w-full">
              <h1 className="text-2xl text-gray-600">เลือกรูปที่แตกต่างกัน</h1>
            </div>
            <div className="flex flex-col space-y-8">
              <div className="flex flex-col space-y-2">
                <span className="text-gray-600 text-lg">รูปชุดที่ 1</span>
                <div className="grid grid-cols-3 gap-2 w-full border-2 border-gray-300 shadow-xl rounded-xl p-2">
                  {vSet1?.map((vocabulary, index) => (
                    <div
                      key={index}
                      className="flex w-full rounded-xl shadow-sm"
                    >
                      <img
                        src={vocabulary.img_normal}
                        className="w-full rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <span className="text-gray-600 text-lg">รูปชุดที่ 2</span>
                <div className="grid grid-cols-3 gap-2 w-full border-2 border-gray-300 shadow-xl rounded-xl p-2">
                  {vSet2?.map((vocabulary, index) => (
                    <div
                      key={index}
                      className="flex w-full rounded-xl shadow-sm"
                    >
                      <img
                        src={vocabulary.img_normal}
                        className="w-full rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col w-full border-2 border-gray-300 shadow-lg p-3 rounded-2xl">
                <div className="flex w-full justify-between py-3">
                  <div className="flex space-x-1 items-end">
                    <h1 className="text-gray-600 text-xl">เลือกคำตอบ</h1>
                    <h1 className="text-gray-600 text-sm">(จากรูปชุดที่ 2)</h1>
                  </div>
                  <h1 className="text-xl text-gray-600">
                    {userSelected.length} / 3
                  </h1>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                  {vSet2?.map((vocabulary, index) => (
                    <div
                      key={index}
                      className={`${
                        statusBtn[index]
                          ? "bg-blue-500 border-3 border-blue-300"
                          : "bg-gray-50 border-2 border-gray-300"
                      } flex items-center justify-center px-1 py-2 rounded-xl cursor-pointer`}
                      onClick={() =>
                        handleSelectAnswer(
                          index,
                          vocabulary.name,
                          vocabulary.img_normal
                        )
                      }
                    >
                      <h1
                        className={`${
                          statusBtn[index] ? "text-gray-50" : "text-gray-600"
                        }  text-xl`}
                      >
                        {vocabulary.name}
                      </h1>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Ipad */}
          <div className="hidden md:flex xl:hidden w-full flex-col p-6 gap-y-14">
            <div className="flex w-full justify-center">
              <h1 className="text-4xl text-gray-600">เลือกรูปที่แตกต่างกัน</h1>
            </div>
            <div className="flex justify-between w-full space-x-6">
              <div className="flex flex-col w-[50%] space-y-8 border-2 border-gray-300 rounded-3xl shadow-xl">
                <span className="flex justify-center text-gray-600 text-2xl py-3">
                  รูปชุดที่ 1
                </span>
                <div className="grid grid-cols-3 gap-3 w-full p-3">
                  {vSet1?.map((vocabulary, index) => (
                    <div
                      key={index}
                      className="flex w-full rounded-xl shadow-sm"
                    >
                      <img
                        src={vocabulary.img_normal}
                        className="w-full rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col w-[50%] space-y-8 border-2 border-gray-300 rounded-3xl shadow-xl">
                <span className="flex justify-center text-gray-600 text-2xl py-3">
                  รูปชุดที่ 2
                </span>
                <div className="grid grid-cols-3 gap-3 w-full p-3">
                  {vSet2?.map((vocabulary, index) => (
                    <div
                      key={index}
                      className="flex w-full rounded-xl shadow-sm"
                    >
                      <img
                        src={vocabulary.img_normal}
                        className="w-full rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full p-4 border-2 border-gray-300 rounded-3xl shadow-xl">
              <div className="flex w-full justify-between space-x-8 py-4">
                <div className="flex items-end space-x-2">
                  <h1 className="text-gray-600 text-3xl">เลือกคำตอบ</h1>
                  <h1 className="text-gray-600 text-2xl">(จากรูปชุดที่ 2)</h1>
                </div>
                <h1 className="text-3xl text-gray-600">
                  {userSelected.length} / 3
                </h1>
              </div>
              <div className="grid grid-cols-3 gap-x-4 gap-y-4">
                {vSet2?.map((vocabulary, index) => (
                  <div
                    key={index}
                    className={`${
                      statusBtn[index]
                        ? "bg-blue-500 border-3 border-blue-300"
                        : "bg-gray-50 border-2 border-gray-300"
                    } flex items-center justify-center px-1 py-2 rounded-xl cursor-pointer`}
                    onClick={() =>
                      handleSelectAnswer(
                        index,
                        vocabulary.name,
                        vocabulary.img_normal
                      )
                    }
                  >
                    <h1
                      className={`${
                        statusBtn[index] ? "text-gray-50" : "text-gray-600"
                      } text-3xl`}
                    >
                      {vocabulary.name}
                    </h1>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Computer */}
          <div className="hidden xl:flex w-full items-center flex-col p-6 gap-y-14">
            <div className="flex w-full justify-center">
              <h1 className="text-4xl text-gray-600">เลือกรูปที่แตกต่างกัน</h1>
            </div>
            <div className="flex w-full justify-center space-x-14">
              <div className="w-[40%] flex flex-col space-y-2">
                <span className="text-gray-600 text-xl">รูปชุดที่ 1</span>
                <div className="grid grid-cols-3 gap-2 w-full border-2 border-gray-300 shadow-xl rounded-2xl p-3">
                  {vSet1?.map((vocabulary, index) => (
                    <div
                      key={index}
                      className="flex w-full rounded-xl shadow-sm"
                    >
                      <img
                        src={vocabulary.img_normal}
                        className="w-full rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-[40%] flex flex-col space-y-2">
                <span className="text-gray-600 text-xl">รูปชุดที่ 2</span>
                <div className="grid grid-cols-3 gap-2 w-full border-2 border-gray-300 shadow-xl rounded-2xl p-3">
                  {vSet2?.map((vocabulary, index) => (
                    <div
                      key={index}
                      className="flex w-full rounded-xl shadow-sm"
                    >
                      <img
                        src={vocabulary.img_normal}
                        className="w-full rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col w-[85%] p-4 border-2 border-gray-300 rounded-3xl shadow-xl">
              <div className="flex w-full justify-between py-4">
                <div className="flex items-end space-x-2">
                  <h1 className="text-gray-600 text-3xl">เลือกคำตอบ</h1>
                  <h1 className="text-gray-600 text-2xl">(จากรูปชุดที่ 2)</h1>
                </div>
                <h1 className="text-3xl text-gray-600">
                  {userSelected.length} / 3
                </h1>
              </div>
              <div className="grid grid-cols-4 gap-x-4 gap-y-4">
                {vSet2?.map((vocabulary, index) => (
                  <div
                    key={index}
                    className={`${
                      statusBtn[index]
                        ? "bg-blue-500 border-3 border-blue-300"
                        : "bg-gray-50 border-2 border-gray-300"
                    } flex items-center justify-center px-1 py-2 rounded-xl cursor-pointer`}
                    onClick={() =>
                      handleSelectAnswer(
                        index,
                        vocabulary.name,
                        vocabulary.img_normal
                      )
                    }
                  >
                    <h1
                      className={`${
                        statusBtn[index] ? "text-gray-50" : "text-gray-600"
                      } text-3xl`}
                    >
                      {vocabulary.name}
                    </h1>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {userSelected.length >= 3 ? (
        <Modal show={showScore} onHide={handleHiddenModal} className="modal-xl">
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
            <ScoreDifferenceGameModal summaries={summaries} />
          </Modal.Body>
        </Modal>
      ) : null}
    </>
  );
}

export default DifferenceGame;
