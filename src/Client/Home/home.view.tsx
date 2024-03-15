import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HomeViewModel from "./home.viewmodel";
import { Modal } from "react-bootstrap";
import AddCategoryModal from "./components/addCategoryModal";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UpdateCategoryModal from "./components/updateCategoryModal";
import Loading from "../../components/loading";

function Home() {
  const {
    authentication,
    categories,
    showCreate,
    showUpdate,
    handleShowCreate,
    handleCloseCreate,
    handleShowUpdate,
    handleCloseUpdate,
    handleDeleteCategory,
    updateID,
    updateName,
    inputUser,
    setInputUser,
  } = HomeViewModel();

  return (
    <>
      {categories === undefined ? (
        <Loading massage="กำลังโหลดข้อมูล" />
      ) : (
        <div className="block w-full h-screen bg-white space-y-8 md:space-y-12">
          <div className="flex flex-col items-center bg-gradient-to-r from-sky-500 to-indigo-500 shadow-xl h-40 md:h-48 lg:h-64 rounded-b-[50px]">
            <h1 className="mt-6 text-xl font-bold text-gray-50 md:text-2xl lg:text-3xl">
              ค้นหาคำศัพท์
            </h1>
            <div className="bg-white flex items-center justify-between rounded-2xl mt-4 md:mt-8 h-8 md:h-10 md:w-72 shadow-lg">
              <input
                type="text"
                onChange={(e) => setInputUser(e.target.value)}
                className="w-full rounded-l-2xl px-3 focus:outline-none"
              />
              {/* Search Vocabulary Button */}
              {inputUser ? (
                <Link
                  to="/vocabularies/education"
                  state={{ userInput: inputUser }}
                  className="flex items-center justify-center bg-sky-600 hover:bg-sky-700 border-2 h-8 md:h-10 w-20 rounded-l-full"
                >
                  <SearchIcon className="mt-[2px] mr-[2px] md:mt-1 text-white" />
                </Link>
              ) : (
                <SearchIcon className="mt-[2px] mr-2 md:mt-1" />
              )}
            </div>
          </div>
          <h1 className="w-full flex justify-center text-gray-600 text-lg md:text-2xl">
            เลือกหมวดหมู่ที่ต้องการเรียน
          </h1>
          <div className="px-8 md:px-20 lg:px-24">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-y-4 gap-x-4 md:gap-y-8 lg:gap-x-8">
              {/* Add category menu */}
              {authentication ? (
                <div
                  onClick={handleShowCreate}
                  className="flex flex-col justify-center cursor-pointer space-y-4 items-center border-[2px] rounded-2xl md:rounded-3xl h-auto shadow-md hover:bg-blue-200 active:bg-blue-300"
                >
                  <AddCircleOutlineIcon
                    style={{ fontSize: "80px", color: "gray" }}
                  />
                  <h1 className="text-xl md:text-2xl text-gray-600">
                    เพิ่มหมวดหมู่
                  </h1>
                </div>
              ) : null}
              {/* Categories menu */}
              {categories?.map((category, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center py-2 justify-between border-[2px] rounded-2xl md:rounded-3xl shadow-md hover:bg-blue-200 active:bg-blue-300"
                  >
                    <Link
                      to="/vocabularies"
                      state={{
                        category_name: category.categories_name,
                        category_img: category.img_sign_language,
                      }}
                      className="flex flex-col w-full items-center no-underline text-gray-600"
                    >
                      <div className="w-full p-2 h-[120px] md:h-[140px] md:w-[140px]">
                        <img
                          src={category.img_normal}
                          alt="categories"
                          className="w-full max-h-[104px] rounded-xl"
                        />
                      </div>
                      <div className="flex justify-center w-full text-xl md:text-2xl px-1">
                        <h1 className="text-lg md:text-2xl text-gray-600">
                          {category.categories_name &&
                            category.categories_name.replace(/_/g, "-")}
                        </h1>
                      </div>
                    </Link>

                    {/* Edit and delete category button menu */}
                    {authentication ? (
                      <div className="flex items-center justify-center space-x-6 pt-2 border-t-[1px] shadow-inner w-full">
                        <EditIcon
                          onClick={() =>
                            handleShowUpdate(
                              category.id,
                              category.categories_name
                            )
                          }
                          style={{ color: "yellowgreen", cursor: "pointer" }}
                        />
                        <DeleteIcon
                          style={{ color: "red", cursor: "pointer" }}
                          onClick={() =>
                            handleDeleteCategory(
                              category.id,
                              category.categories_name
                            )
                          }
                        />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Add Category Modal */}
          <Modal
            show={showCreate}
            onHide={handleCloseCreate}
            className="modal-lg"
          >
            <Modal.Header className="bg-gray-800 border-[2px] border-gray-400">
              <div className="flex w-full items-center justify-between">
                <h1 className=" text-gray-200">เพิ่มหมวดหมู่</h1>
                <div
                  onClick={handleCloseCreate}
                  className="text-gray-200 cursor-pointer text-2xl"
                >
                  <CloseIcon />
                </div>
              </div>
            </Modal.Header>
            <Modal.Body>
              <AddCategoryModal closeCreate={handleCloseCreate} />
            </Modal.Body>
          </Modal>

          {/* Update Category Modal */}
          <Modal
            show={showUpdate}
            onHide={handleCloseUpdate}
            className="modal-lg"
          >
            <Modal.Header className="bg-gray-800 border-[2px] border-gray-400">
              <div className="flex w-full items-center justify-between">
                <h1 className=" text-gray-200">
                  แก้ไขหมวดหมู่ : {updateName && updateName.replace(/_/g, "-")}
                </h1>
                <div
                  onClick={handleCloseUpdate}
                  className="text-gray-200 cursor-pointer text-2xl"
                >
                  <CloseIcon />
                </div>
              </div>
            </Modal.Header>
            <Modal.Body>
              <UpdateCategoryModal
                id={updateID}
                closeUpdate={handleCloseUpdate}
              />
            </Modal.Body>
          </Modal>
          <div className="w-full h-10"></div>
        </div>
      )}
    </>
  );
}

export default Home;
