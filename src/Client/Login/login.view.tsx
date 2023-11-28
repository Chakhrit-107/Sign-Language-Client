import React from "react";
import LoginViewModel from "./login.viewmodel";

function Login() {
  const { setUserName, setPassword, handleLogin } = LoginViewModel();

  return (
    <>
      <div className="flex justify-center bg-gradient-to-r from-sky-500 to-indigo-500 w-full h-screen">
        <div className="absolute top-[30%] flex flex-col items-center w-[80%] md:w-[70%] lg:md:w-[50%] h-auto space-y-8 md:space-y-14 lg:space-y-16 py-10 bg-gray-100 border-3 border-gray-500 rounded-2xl shadow-2xl">
          <h1 className="text-3xl md:text-[60px] font-bold text-gray-800">
            เข้าสู่ระบบ
          </h1>
          <div className="w-[60%]">
            <h1 className="text-gray-800 text-lg md:text-xl">ชื่อผู้ใช้</h1>
            <input
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              className="w-full h-10 border-[2px] border-gray-600 rounded-lg px-3"
            />
          </div>
          <div className="w-[60%]">
            <h1 className="text-gray-800 text-lg md:text-xl">รหัสผ่าน</h1>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 border-[2px] border-gray-600 rounded-lg px-3"
            />
          </div>
          <button
            onClick={handleLogin}
            className="p-[12px] text-white text-xl font-bold rounded-lg bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
          >
            เข้าสู่ระบบ
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
