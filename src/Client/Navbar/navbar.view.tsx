import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SignLanguageIcon from "@mui/icons-material/SignLanguage";
import LoginIcon from "@mui/icons-material/Login";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import configBackend from "../../config/config.backend";
import axios from "axios";
import Swal from "sweetalert2";
import SchoolIcon from "@mui/icons-material/School";

function Navbar() {
  const { PROTOCOL, HOST, PORT, AUTHENTICATION, VERIFY } = configBackend;

  const [isOpen, setIsOpen] = useState(false);

  const initialMenu = sessionStorage.getItem("selectedMenu") || "home";
  const [selectedMenu, setSelectedMenu] = useState<string>(initialMenu);
  const [authentication, setAuthentication] = useState<boolean>(false);

  const accessToken = sessionStorage.getItem("accessToken");

  // verify account
  useEffect(() => {
    const verifyAccountController = async () => {
      try {
        if (accessToken) {
          const checkedToken = await axios.get(
            `${PROTOCOL}://${HOST}:${PORT}/${AUTHENTICATION}/${VERIFY}/${accessToken}`
          );

          const auth = checkedToken.data;
          setAuthentication(auth);
        }
      } catch (err) {
        console.log("Error verify account: ", err);
      }
    };

    verifyAccountController();
  }, [accessToken]);

  useEffect(() => {
    sessionStorage.setItem("selectedMenu", selectedMenu);
  }, [selectedMenu]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "ออกจากระบบ",
      text: "คุณต้องการออกจากระบบใช่หรือไม่ ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ออกจากระบบ",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "ออกจากระบบแล้ว",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          sessionStorage.setItem("accessToken", "");
          window.location.href = "/";

          setSelectedMenu("home");
          setAuthentication(false);
        });
      }
    });
  };

  return (
    <>
      <nav className="sticky z-50 top-0 bg-gray-800 text-white">
        <div className="px-6 py-4 md:py-8">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              onClick={() => handleMenuClick("home")}
              className="no-underline"
            >
              <div className="flex items-center">
                <SignLanguageIcon className="text-white text-2xl" />
                <h1 className="ml-4 text-white text-2xl md:text-3xl font-bold">
                  Sign Language
                </h1>
              </div>
            </Link>

            {/* Computer and Ipad */}
            <div className="hidden md:flex items-center gap-x-6 lg:gap-x-16">
              <Link
                to="/"
                onClick={() => handleMenuClick("home")}
                className={`${
                  selectedMenu === "home" ? "text-blue-500" : "text-white"
                } text-xl md:text-2xl font-bold cursor-pointer hover:text-blue-500 active:bg-blue-600 no-underline`}
              >
                หน้าหลัก
              </Link>
              <Link
                to="/characters"
                onClick={() => handleMenuClick("characters")}
                className={`${
                  selectedMenu === "characters" ? "text-blue-500" : "text-white"
                } text-xl md:text-2xl font-bold cursor-pointer hover:text-blue-500 active:bg-blue-600 no-underline`}
              >
                ตัวอักษร
              </Link>
              <Link
                to="/games"
                onClick={() => handleMenuClick("games")}
                className={`${
                  selectedMenu === "games" ? "text-blue-500" : "text-white"
                } text-xl md:text-2xl font-bold cursor-pointer hover:text-blue-500 active:bg-blue-600 no-underline`}
              >
                เกม
              </Link>

              {authentication ? (
                <div
                  onClick={handleLogout}
                  className="flex items-center md:gap-x-1 cursor-pointer ml-6 no-underline"
                >
                  <h1
                    className={`text-xl md:text-2xl font-bold cursor-pointer hover:text-blue-500 ${
                      selectedMenu === "login" ? "text-blue-500" : "text-white"
                    }`}
                  >
                    ออกจากระบบ
                  </h1>
                  <LoginIcon className="text-white mt-1" />
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => handleMenuClick("login")}
                  className="flex items-center md:gap-x-1 cursor-pointer ml-6 no-underline"
                >
                  <h1
                    className={`text-xl md:text-2xl font-bold cursor-pointer hover:text-blue-500 pt-2 ${
                      selectedMenu === "login" ? "text-blue-500" : "text-white"
                    }`}
                  >
                    เข้าสู่ระบบ
                  </h1>
                  <LoginIcon className="text-white mt-1" />
                </Link>
              )}
            </div>

            {/* Toggle Button Menu*/}
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={toggleMenu}
            >
              {isOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Scroll to top button */}
        <div
          className="fixed bottom-4 right-4 bg-gray-600 text-white p-2 rounded-full cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ExpandLessIcon />
        </div>

        {/* Mobile */}
        {isOpen && (
          <div className="md:hidden absolute w-full bg-gray-800 px-4 pt-4 pb-8 space-y-4 rounded-b-xl border-t-[2px] border-gray-400">
            <Link
              to="/"
              className="block items-center text-white font-bold text-lg py-3 px-6 border-[2px] border-gray-400 rounded-2xl no-underline"
              onClick={toggleMenu}
            >
              <HomeIcon className="mb-1" />
              <span className="ml-4">หน้าหลัก</span>
            </Link>
            <Link
              to="/characters"
              className="block items-center text-white font-bold text-lg py-3 px-6 border-[2px] border-gray-400 rounded-2xl no-underline"
              onClick={toggleMenu}
            >
              <SchoolIcon className="mb-1" />
              <span className="ml-4">ตัวอักษร</span>
            </Link>
            <Link
              to="/games"
              className="block items-center text-white font-bold text-lg py-3 px-6 border-[2px] border-gray-400 rounded-2xl no-underline"
              onClick={toggleMenu}
            >
              <SportsEsportsIcon className="mb-1" />
              <span className="ml-4">เกม</span>
            </Link>

            {authentication ? (
              <div
                className="block items-center text-white font-bold text-lg py-3 px-6 border-[2px] border-gray-400 rounded-2xl no-underline"
                onClick={handleLogout}
              >
                <LoginIcon className="text-white mt-1" />
                <span className="ml-4">ออกจากระบบ</span>
              </div>
            ) : (
              <Link
                to="/login"
                className="block items-center text-white font-bold text-lg py-3 px-6 border-[2px] border-gray-400 rounded-2xl no-underline"
                onClick={toggleMenu}
              >
                <LoginIcon className="text-white mt-1" />
                <span className="ml-4">เข้าสู่ระบบ</span>
              </Link>
            )}
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
