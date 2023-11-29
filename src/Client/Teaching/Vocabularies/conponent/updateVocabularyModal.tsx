import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import configBackend from "../../../../config/config.backend";
import Swal from "sweetalert2";

interface UpdateVocabularyProp {
  id: number | undefined;
  categoryName: string;
  closeUpdate: () => void;
}

function UpdateVocabularyModal({
  id,
  categoryName,
  closeUpdate,
}: UpdateVocabularyProp) {
  const [newVocabulary, setNewVocabulary] = useState<string>("");
  const [newImgNormal, setNewImgNormal] = useState<File | null>(null);
  const [newImgSignLanguage, setNewImgSignLanguage] = useState<File | null>(
    null
  );
  const [newVideo, setNewVideo] = useState<File | null>(null);

  const [showImgNormal, setShowImgNormal] = useState<string>("");
  const [showImgSignLanguage, setShowImgSignLanguage] = useState<string>("");
  const [showVideo, setShowVideo] = useState<string>("");

  const { API_URL, VOCABULARIES } = configBackend;

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

  const onChangeVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setNewVideo(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setShowVideo(reader.result as string);
      };

      reader.readAsDataURL(file);
    } else {
      setNewVideo(null);
      setShowVideo("");
    }
  };

  const checkVocabulary = async () => {
    const thaiTextPattern = /^[ก-๏\s]+$/;
    if (!newVocabulary) {
      Swal.fire("ข้อมูลไม่ครบถ้วน", `กรุณาเพิ่ม: "คำศัพท์"`, "error");

      return false;
    } else if (
      !thaiTextPattern.test(newVocabulary) ||
      newVocabulary.includes(" ")
    ) {
      Swal.fire(
        "คำศัพท์ไม่ถูกต้อง",
        `กรุณาใช้อักษรภาษาไทย<br>และ<u>ห้ามเว้นวรรคหรือใช้ตัวขั้นระหว่างข้อความ</u>`,
        "error"
      );

      return false;
    } else if (!newImgNormal) {
      Swal.fire("ข้อมูลไม่ครบถ้วน", `กรุณาเพิ่ม: "รูปภาพ"`, "error");

      return false;
    } else if (!newImgSignLanguage) {
      Swal.fire("ข้อมูลไม่ครบถ้วน", `กรุณาเพิ่ม: "รูปภาพ(ภาษามือ)"`, "error");

      return false;
    } else if (!newVideo) {
      Swal.fire("ข้อมูลไม่ครบถ้วน", `กรุณาเพิ่ม: "วิดีโอ"`, "error");

      return false;
    } else {
      return true;
    }
  };

  const handleUpdateVocabulary = async () => {
    const formData = new FormData();
    formData.append("tableName", categoryName);
    formData.append("newVocabulary", newVocabulary);

    if (newImgNormal) {
      formData.append("new_img_normal", newImgNormal);
    }
    if (newImgSignLanguage) {
      formData.append("new_img_sign_language", newImgSignLanguage);
    }
    if (newVideo) {
      formData.append("new_video", newVideo);
    }

    try {
      const vocabularyChecked: boolean | undefined = await checkVocabulary();
      if (vocabularyChecked) {
        await axios.put(`${API_URL}/${VOCABULARIES}/${id}`, formData);
        setNewVocabulary("");
        setNewImgNormal(null);
        setNewImgSignLanguage(null);
        setNewVideo(null);

        await Swal.fire({
          position: "center",
          icon: "success",
          title: "แก้ไขคำศัพท์แล้ว",
          showConfirmButton: false,
          timer: 1000,
        });

        closeUpdate();
        window.location.reload();
      }
    } catch (err) {
      console.log("Error update vocabulary: ", err);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center w-full bg-white gap-y-14">
        <div className="flex w-full justify-between">
          <span className="text-gray-800">คำใหม่: </span>
          <input
            type="text"
            onChange={(e) => setNewVocabulary(e.target.value)}
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

        <div className="flex w-full justify-between">
          <span className="text-gray-800">วิดีโอ :</span>
          <input
            type="file"
            onChange={onChangeVideo}
            className="rounded-lg px-3 w-[65%] block text-sm py-1 text-gray-900 border cursor-pointer dark:text-gray-400 dark:bg-gray-100"
          />
        </div>
        {/* show example video */}
        {showVideo && (
          <div className="rounded-2xl">
            <video src={showVideo} className="w-full rounded-2xl shadow-2xl" />
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
            onClick={handleUpdateVocabulary}
            className="btn btn-primary"
          >
            แก้ไข
          </Button>
        </div>
      </div>
    </>
  );
}

export default UpdateVocabularyModal;
