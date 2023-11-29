import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import configBackend from "../../../config/config.backend";
import Vocabulary from "../../../models/vocabularies.model";
import Swal from "sweetalert2";
import axios from "axios";

function VocabulariesViewModel() {
  const location = useLocation();

  const categoryName: string = location.state?.category_name;
  const categoryImgSignLanguage: string = location.state?.category_img;

  const { API_URL, VOCABULARIES, AUTHENTICATION, VERIFY } = configBackend;

  const [authentication, setAuthentication] = useState<boolean>(false);

  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateName, setUpdateName] = useState<string>("");
  const [updateID, setUpdateID] = useState<number>();

  const accessToken = sessionStorage.getItem("accessToken");

  // verify account
  useEffect(() => {
    const verifyAccountController = async () => {
      try {
        if (accessToken) {
          const checkedToken = await axios.get(
            `${API_URL}/${AUTHENTICATION}/${VERIFY}/${accessToken}`
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

  // GET All Vocabularies
  useEffect(() => {
    const getVocabularies = async () => {
      if (categoryName && categoryImgSignLanguage) {
        try {
          const response = await axios.get(
            `${API_URL}/${VOCABULARIES}/${categoryName}`
          );
          const vocabularies = response.data;
          setVocabularies(vocabularies);
        } catch (err) {
          console.log("Error get Vocabularies: ", err);
        }
      }
    };

    getVocabularies();
  }, []);

  const handleDeleteCategory = async (
    id: number,
    category: string,
    tableName: string
  ) => {
    try {
      const confirmDelete = await Swal.fire({
        title: "ยืนยันการลบ",
        text: `คุณต้องการลบคำศัพท์: ${category}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
      });

      if (confirmDelete.isConfirmed) {
        await axios.delete(`${API_URL}/${VOCABULARIES}/${tableName}/${id}`);

        await Swal.fire({
          position: "center",
          icon: "success",
          title: "ลบข้อมูลแล้ว",
          showConfirmButton: false,
          timer: 1000,
        });

        window.location.reload();
      }
    } catch (err) {
      console.log("Error delete vocabulary", err);
    }
  };

  const handleUpdate = (id: number, categoryName: string) => {
    setShowUpdate(true);
    setUpdateID(id);
    setUpdateName(categoryName);
  };

  return {
    authentication,
    categoryName,
    categoryImgSignLanguage,
    vocabularies,
    showCreate,
    handleShowCreate: () => setShowCreate(true),
    handleCloseCreate: () => setShowCreate(false),
    handleDeleteCategory,
    showUpdate,
    handleCloseUpdate: () => setShowUpdate(false),
    updateID,
    updateName,
    handleShowUpdate: (id: number, categoryName: string) =>
      handleUpdate(id, categoryName),
  };
}

export default VocabulariesViewModel;
