import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import configBackend from "../../config/config.backend";

function LoginViewModel() {
  const { PROTOCOL, HOST, PORT, AUTHENTICATION, LOGIN } = configBackend;

  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    try {
      if (userName.length > 0 && password.length > 0) {
        const account = { username: userName, password: password };

        const response = await axios.post(
          `${PROTOCOL}://${HOST}:${PORT}/${AUTHENTICATION}/${LOGIN}`,
          account
        );

        if (response.status === 200) {
          const accessToken = response.data.token;
          sessionStorage.setItem("accessToken", accessToken);

          Swal.fire({
            position: "center",
            icon: "success",
            title: "เข้าสู่ระบบสำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            sessionStorage.setItem("selectedMenu", "home");
            window.location.href = "/";
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "ข้อมูลไม่ครบถ้วน",
          text: "กรุณาป้อนชื่อผู้ใช้และรหัสผ่าน",
          confirmButtonText: "กลับ",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "เข้าสู่ระบบล้มเหลว",
        text: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
        confirmButtonText: "กลับ",
      });
      console.log("Error Login: ", err);
    }
  };

  return { setUserName, setPassword, handleLogin };
}

export default LoginViewModel;
