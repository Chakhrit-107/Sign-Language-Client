import { useState, useEffect } from "react";
import axios from "axios";
import configBackend from "../../config/config.backend";
import Category from "../../models/categories.model";
import Swal from "sweetalert2";

function HomeViewModel() {
  const { API_URL, CATEGORIES, AUTHENTICATION, VERIFY } = configBackend;

  const [authentication, setAuthentication] = useState<boolean>(false);
  const [inputUser, setInputUser] = useState<string>("");

  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [categories, setCategories] = useState<Category[] | undefined>(
    undefined
  );
  const [updateID, setUpdateID] = useState<number>();
  const [updateName, setUpdateName] = useState<string>("");

  const accessToken = sessionStorage.getItem("accessToken");

  // Verify account
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

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const categoriesRequest = await axios.get(`${API_URL}/${CATEGORIES}`);
        const categories = categoriesRequest.data;
        setCategories(categories);
      } catch (err) {
        console.log("Error get all categories: ", err);
      }
    };

    getAllCategories();
  }, []);

  const handleDeleteCategory = async (id: number, category: string) => {
    try {
      const confirmDelete = await Swal.fire({
        title: "ยืนยันการลบ",
        text: `คุณต้องการลบหมวดหมู่: ${category}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
      });

      if (confirmDelete.isConfirmed) {
        await axios.delete(`${API_URL}/${CATEGORIES}/${category}/${id}`);

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
      console.log("Error delete category: ", err);
    }
  };

  const handleUpdate = (id: number, categoryName: string) => {
    setShowUpdate(true);
    setUpdateID(id);
    setUpdateName(categoryName);
  };

  return {
    authentication,
    categories,
    showCreate,
    showUpdate,
    handleShowCreate: () => setShowCreate(true),
    handleCloseCreate: () => setShowCreate(false),
    handleShowUpdate: (id: number, categoryName: string) =>
      handleUpdate(id, categoryName),
    handleCloseUpdate: () => setShowUpdate(false),
    handleDeleteCategory,
    updateID,
    updateName,
    inputUser,
    setInputUser,
  };
}

export default HomeViewModel;
