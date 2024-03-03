import React from "react";
import SelectGameCategoryViewModel from "./selectGameCategory.viewmodel";
import { Link } from "react-router-dom";
import Loading from "../../components/loading";

function SelectGameCategory() {
  const { categories, selectGame, vMinimum, gameName } =
    SelectGameCategoryViewModel();

  return (
    <>
      {categories === undefined ? (
        <Loading massage="กำลังโหลดข้อมูล" />
      ) : (
        <div className="px-8 md:px-20 lg:px-24  space-y-6 md:space-y-12">
          <div className="flex flex-col items-center md:py-4">
            <h1 className="mt-6 text-2xl font-bold text-gray-600 lg:text-3xl">
              หมวดหมู่ที่ต้องการเล่น
            </h1>
            <span className="text-gray-600 text-sm lg:text-lg">
              ( "{gameName}" ต้องมีคำศัพท์อย่างน้อย {vMinimum} คำ )
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-y-4 gap-x-4 md:gap-y-8 lg:gap-x-8">
            {/* categories Menu for play game */}
            {categories.map((category, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col items-center py-2 justify-between border-[2px] rounded-2xl md:rounded-3xl shadow-md hover:bg-blue-200 active:bg-blue-300"
                >
                  <Link
                    to={`/games/category/${selectGame}`}
                    state={{ selectedCategory: category.categories_name }}
                    className="flex flex-col w-full items-center no-underline text-gray-600"
                  >
                    <div className="w-full p-2 h-[120px] md:h-[140px] md:w-[140px]">
                      <img
                        src={category.img_normal}
                        className="w-full max-h-[104px] rounded-xl"
                      />
                    </div>
                    <div className="flex justify-center w-full text-xl md:text-2xl px-3">
                      <h1 className="text-xl md:text-2xl text-gray-600">
                        {category.categories_name &&
                          category.categories_name.replace(/_/g, "-")}
                      </h1>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="w-full h-10"></div>
        </div>
      )}
    </>
  );
}

export default SelectGameCategory;
