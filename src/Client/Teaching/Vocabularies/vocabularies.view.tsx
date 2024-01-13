import React from "react";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import VocabulariesViewModel from "./vocabularies.viewmodel";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Modal } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import AddVocabularyModal from "./conponent/addVocabularyModal";
import UpdateVocabularyModal from "./conponent/updateVocabularyModal";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

function Vocabularies() {
  const {
    authentication,
    categoryName,
    categoryImgSignLanguage,
    vocabularies,
    showCreate,
    handleShowCreate,
    handleCloseCreate,
    handleDeleteCategory,
    showUpdate,
    handleCloseUpdate,
    updateID,
    updateName,
    handleShowUpdate,
  } = VocabulariesViewModel();

  return (
    <>
      <div className="block w-full h-screen bg-white space-y-8 md:space-y-12">
        <div className="flex flex-col space-y-3 md:space-y-6 lg:space-y-8 items-center bg-gradient-to-r from-sky-500 to-indigo-500 shadow-xl h-[360px] md:h-[470px] lg:h-[570px] rounded-b-[40px] md:rounded-b-[70px]">
          <h1 className="mt-6 text-xl font-bold text-gray-50 md:text-2xl lg:text-3xl">
            หมวดหมู่ : {categoryName && categoryName.replace(/_/g, "-")}
          </h1>
          <Link to={"/"}>
            <KeyboardBackspaceIcon
              className="absolute left-4 top-28 cursor-pointer"
              style={{ fontSize: "2rem", fill: "white" }}
            />
          </Link>
          <div className="flex items-center justify-center bg-gray-300 border-[2px] border-gray-400 shadow-2xl rounded-3xl w-60 md:w-80 lg:w-96 h-auto">
            <img src={categoryImgSignLanguage} className="w-full rounded-3xl" />
          </div>
        </div>
        <div className="px-8 md:px-20 lg:px-24">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-y-4 gap-x-4 md:gap-y-8 lg:gap-x-8">
            {/* add menu for admin */}
            {authentication ? (
              <div
                onClick={handleShowCreate}
                className="flex flex-col justify-center cursor-pointer space-y-4 items-center border-[2px] rounded-2xl md:rounded-3xl h-auto shadow-md hover:bg-blue-200 active:bg-blue-300"
              >
                <AddCircleOutlineIcon
                  style={{ fontSize: "80px", color: "gray" }}
                />
                <h1 className="text-xl md:text-2xl text-gray-600">
                  เพิ่มคำศัพท์
                </h1>
              </div>
            ) : null}
            {/* vocabularies Menu */}
            {vocabularies.map((vocabulary, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col items-center py-2 justify-between border-[2px] rounded-2xl md:rounded-3xl shadow-md hover:bg-blue-200 active:bg-blue-300"
                >
                  <Link
                    to="/vocabularies/education"
                    state={{
                      name: vocabulary.name,
                      imgNormal: vocabulary.img_normal,
                      video: vocabulary.video,
                      imgSign: vocabulary.img_sign_language,
                      category: categoryName,
                      imgCategory: categoryImgSignLanguage,
                    }}
                    className="flex flex-col w-full items-center no-underline text-gray-600"
                  >
                    <div className="w-full p-2 h-[120px] md:h-[140px] md:w-[140px]">
                      <img
                        src={vocabulary.img_normal}
                        className="w-full max-h-[104px] rounded-xl"
                      />
                    </div>
                    <div className="flex justify-center w-full text-xl md:text-2xl px-3">
                      <h1 className="text-xl md:text-2xl text-gray-600">
                        {vocabulary.name}
                      </h1>
                    </div>
                  </Link>
                  {authentication ? (
                    <div className="flex items-center justify-center space-x-6 pt-2 border-t-[1px] shadow-inner w-full">
                      <EditIcon
                        onClick={() =>
                          handleShowUpdate(vocabulary.id, vocabulary.name)
                        }
                        style={{ color: "yellowgreen", cursor: "pointer" }}
                      />
                      <DeleteIcon
                        onClick={() =>
                          handleDeleteCategory(
                            vocabulary.id,
                            vocabulary.name,
                            categoryName
                          )
                        }
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        {/* Add Vocabulary Modal */}
        <Modal
          show={showCreate}
          onHide={handleCloseCreate}
          className="modal-lg"
        >
          <Modal.Header className="bg-gray-800 border-[2px] border-gray-400">
            <div className="flex w-full items-center justify-between">
              <h1 className=" text-gray-200">เพิ่มคำศัพท์</h1>
              <div
                onClick={handleCloseCreate}
                className="text-gray-200 cursor-pointer text-2xl"
              >
                <CloseIcon />
              </div>
            </div>
          </Modal.Header>
          <Modal.Body>
            <AddVocabularyModal
              closeCreate={handleCloseCreate}
              categoryName={categoryName}
            />
          </Modal.Body>
        </Modal>

        {/* Update Vocabulary Modal */}
        <Modal
          show={showUpdate}
          onHide={handleCloseUpdate}
          className="modal-lg"
        >
          <Modal.Header className="bg-gray-800 border-[2px] border-gray-400">
            <div className="flex w-full items-center justify-between">
              <h1 className=" text-gray-200">แก้ไขคำศัพท์ : {updateName}</h1>
              <div
                onClick={handleCloseUpdate}
                className="text-gray-200 cursor-pointer text-2xl"
              >
                <CloseIcon />
              </div>
            </div>
          </Modal.Header>
          <Modal.Body>
            <UpdateVocabularyModal
              id={updateID}
              categoryName={categoryName}
              closeUpdate={handleCloseUpdate}
            />
          </Modal.Body>
        </Modal>
        <div className="w-full h-10"></div>
      </div>
    </>
  );
}

export default Vocabularies;
