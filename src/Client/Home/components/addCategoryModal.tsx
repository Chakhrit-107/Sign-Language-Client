import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import configBackend from "../../../config/config.backend";

interface AddCategoryProps {
  closeCreate: () => void;
}

function AddCategoryModal({ closeCreate }: AddCategoryProps) {
  const [category, setCategory] = useState<string>("");
  const [imgNormal, setImgNormal] = useState<File | null>(null);
  const [imgSignLanguage, setImgSignLanguage] = useState<File | null>(null);

  const [showImgNormal, setShowImgNormal] = useState<string>("");
  const [showImgSignLanguage, setShowImgSignLanguage] = useState<string>("");

  const { PROTOCOL, HOST, PORT, CATEGORIES } = configBackend;

  const onChangeImgNormal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImgNormal(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setShowImgNormal(reader.result as string);
      };

      reader.readAsDataURL(file);
    } else {
      setImgNormal(null);
      setShowImgNormal("");
    }
  };

  const onChangeImgSignLanguage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImgSignLanguage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setShowImgSignLanguage(reader.result as string);
      };

      reader.readAsDataURL(file);
    } else {
      setImgSignLanguage(null);
      setShowImgSignLanguage("");
    }
  };

  const checkCategory = async () => {
    const thaiTextPattern = /^[ก-๏\s-]+$/;
    if (!category) {
      Swal.fire("ข้อมูลไม่ครบถ้วน", `กรุณาเพิ่ม: "หมวดหมู่"`, "error");

      return false;
    } else if (!thaiTextPattern.test(category) || category.includes(" ")) {
      Swal.fire(
        "หมวดหมู่ไม่ถูกต้อง",
        `กรุณาใช้อักษรภาษาไทย<br>และใช้เครื่องหมาย "-" ขั้นระหว่างข้อความและ<u>ห้ามเว้นวรรค</u>`,
        "error"
      );

      return false;
    } else if (!imgNormal) {
      Swal.fire("ข้อมูลไม่ครบถ้วน", `กรุณาเพิ่ม: "รูปภาพ"`, "error");

      return false;
    } else if (!imgSignLanguage) {
      Swal.fire("ข้อมูลไม่ครบถ้วน", `กรุณาเพิ่ม: "รูปภาพ(ภาษามือ)"`, "error");

      return false;
    } else {
      return true;
    }
  };

  const handleCreateCategory = async () => {
    const formData = new FormData();
    formData.append("categories_name", category);

    if (imgNormal) {
      formData.append("img_normal", imgNormal);
    }
    if (imgSignLanguage) {
      formData.append("img_sign_language", imgSignLanguage);
    }

    try {
      const categoryChecked: boolean | undefined = await checkCategory();

      if (categoryChecked) {
        await axios.post(
          `${PROTOCOL}://${HOST}:${PORT}/${CATEGORIES}`,
          formData
        );
        setCategory("");
        setImgNormal(null);
        setImgSignLanguage(null);

        await Swal.fire({
          position: "center",
          icon: "success",
          title: "เพิ่มหมวดหมู่แล้ว",
          showConfirmButton: false,
          timer: 1000,
        });

        window.location.reload();
        closeCreate();
      }
    } catch (error) {
      console.error("Error posting category:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center w-full bg-white gap-y-14">
        <div className="flex w-full justify-between">
          <span className="text-gray-800">หมวดหมู่ :</span>
          <input
            type="text"
            onChange={(e) => setCategory(e.target.value)}
            className="border-[2px] border-gray-400 rounded-lg px-2 w-[70%] text-sm py-1"
          />
        </div>
        <div className="flex w-full justify-between">
          <span className="text-gray-800">รูปภาพ :</span>
          <input
            type="file"
            onChange={onChangeImgNormal}
            className="rounded-lg px-3 w-[70%] block text-sm py-1 text-gray-900 border cursor-pointer dark:text-gray-400 dark:bg-gray-100"
          />
        </div>
        {/* show example image Normal */}
        {showImgNormal && (
          <div className="rounded-2xl">
            <img
              src={showImgNormal}
              className="w-full rounded-2xl shadow-2xl"
            />
          </div>
        )}
        <div className="flex w-full justify-between">
          <span className="text-gray-800">รูปภาพ(ภาษามือ) :</span>
          <input
            type="file"
            onChange={onChangeImgSignLanguage}
            className="rounded-lg px-3 w-[70%] block text-sm py-1 text-gray-900 border cursor-pointer dark:text-gray-400 dark:bg-gray-100"
          />
        </div>
        {/* show example image SignLanguage */}
        {showImgSignLanguage && (
          <div className="rounded-2xl">
            <img
              src={showImgSignLanguage}
              className="w-full rounded-2xl shadow-2xl"
            />
          </div>
        )}
        <div className="flex justify-end w-full space-x-4">
          <Button
            type="button"
            onClick={closeCreate}
            className="btn btn-danger"
          >
            ยกเลิก
          </Button>
          <Button
            type="submit"
            onClick={handleCreateCategory}
            className="btn btn-primary"
          >
            ยืนยัน
          </Button>
        </div>
      </div>
    </>
  );
}

export default AddCategoryModal;
