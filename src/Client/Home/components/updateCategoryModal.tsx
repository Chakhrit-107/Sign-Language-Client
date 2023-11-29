import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import configBackend from "../../../config/config.backend";
import Swal from "sweetalert2";

interface UpdateCategoryProp {
  id: number | undefined;
  closeUpdate: () => void;
}

function UpdataCategoriyModal({ id, closeUpdate }: UpdateCategoryProp) {
  const [newCategory, setNewCategory] = useState<string>("");
  const [newImgNormal, setNewImgNormal] = useState<File | null>(null);
  const [newImgSignLanguage, setNewImgSignLanguage] = useState<File | null>(
    null
  );

  const [showImgNormal, setShowImgNormal] = useState<string>("");
  const [showImgSignLanguage, setShowImgSignLanguage] = useState<string>("");

  const { API_URL, CATEGORIES } = configBackend;

  const onChangeNewImgNormal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setNewImgNormal(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setShowImgNormal(reader.result as string);
      };

      reader.readAsDataURL(file);
    } else {
      setNewImgNormal(null);
      setShowImgNormal("");
    }
  };

  const onChangeNewImgSignLanguage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setNewImgSignLanguage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setShowImgSignLanguage(reader.result as string);
      };

      reader.readAsDataURL(file);
    } else {
      setNewImgSignLanguage(null);
      setShowImgSignLanguage("");
    }
  };

  const checkCategory = async () => {
    const thaiTextPattern = /^[ก-๏\s-]+$/;
    if (!newCategory) {
      Swal.fire("ข้อมูลไม่ครบถ้วน", `กรุณาเพิ่ม: "หมวดหมู่"`, "error");

      return false;
    } else if (
      !thaiTextPattern.test(newCategory) ||
      newCategory.includes(" ")
    ) {
      Swal.fire(
        "หมวดหมู่ไม่ถูกต้อง",
        `กรุณาใช้อักษรภาษาไทย<br>และใช้เครื่องหมาย "-" ขั้นระหว่างข้อความและ<u>ห้ามเว้นวรรค</u>`,
        "error"
      );

      return false;
    } else if (!newImgNormal) {
      Swal.fire("ข้อมูลไม่ครบถ้วน", `กรุณาเพิ่ม: "รูปภาพ"`, "error");

      return false;
    } else if (!newImgSignLanguage) {
      Swal.fire("ข้อมูลไม่ครบถ้วน", `กรุณาเพิ่ม: "รูปภาพ(ภาษามือ)"`, "error");

      return false;
    } else {
      return true;
    }
  };

  const handleUpdateCategory = async () => {
    const formData = new FormData();
    formData.append("categories_name", newCategory);

    if (newImgNormal) {
      formData.append("img_normal", newImgNormal);
    }
    if (newImgSignLanguage) {
      formData.append("img_sign_language", newImgSignLanguage);
    }

    try {
      const categoryChecked: boolean | undefined = await checkCategory();

      if (categoryChecked) {
        await axios.put(`${API_URL}/${CATEGORIES}/${id}`, formData);
        setNewCategory("");
        setNewImgNormal(null);
        setNewImgSignLanguage(null);

        await Swal.fire({
          position: "center",
          icon: "success",
          title: "แก้ไขหมวดหมู่แล้ว",
          showConfirmButton: false,
          timer: 1000,
        });

        window.location.reload();
        closeUpdate();
      }
    } catch (err) {
      console.log("Error update category", err);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center w-full bg-white gap-y-14">
        <div className="flex w-full justify-between">
          <span className="text-gray-800">หมวดหมู่ใหม่: </span>
          <input
            type="text"
            onChange={(e) => setNewCategory(e.target.value)}
            className="border-[2px] border-gray-400 rounded-lg px-2 w-[65%] text-sm py-1"
          />
        </div>
        <div className="flex w-full justify-between">
          <span className="text-gray-800">รูปภาพใหม่ :</span>
          <input
            type="file"
            onChange={onChangeNewImgNormal}
            className="rounded-lg px-3 w-[65%] block text-sm py-1 text-gray-900 border cursor-pointer dark:text-gray-400 dark:bg-gray-100"
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
          <span className="text-gray-800">รูปภาพใหม่(ภาษามือ) :</span>
          <input
            type="file"
            onChange={onChangeNewImgSignLanguage}
            className="rounded-lg px-3 w-[65%] block text-sm py-1 text-gray-900 border cursor-pointer dark:text-gray-400 dark:bg-gray-100"
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
            onClick={closeUpdate}
            className="btn btn-danger"
          >
            ยกเลิก
          </Button>
          <Button
            type="submit"
            onClick={handleUpdateCategory}
            className="btn btn-primary"
          >
            แก้ไข
          </Button>
        </div>
      </div>
    </>
  );
}

export default UpdataCategoriyModal;
