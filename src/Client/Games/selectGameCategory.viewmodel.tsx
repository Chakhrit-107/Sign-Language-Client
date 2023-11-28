import { useState, useEffect } from "react";
import configBackend from "../../config/config.backend";
import Category from "../../models/categories.model";
import { useLocation } from "react-router-dom";
import axios from "axios";

function SelectGameCategoryViewModel() {
  const { PROTOCOL, HOST, PORT, CATEGORIES, GAMES } = configBackend;

  const [categories, setCategories] = useState<Category[]>([]);

  const location = useLocation();
  const gameName: string = location.state?.gameName;

  let selectGame = "";
  let vMinimum = -1;
  if (gameName === "เกมจับคู่") {
    selectGame = "matchingGame";
    vMinimum = 4;
  } else if (gameName === "เกมตอบคำถาม") {
    selectGame = "quizGame";
    vMinimum = 3;
  } else if (gameName === "เกมจำลองสถานการณ์") {
    selectGame = "simulationGame";
    vMinimum = 0;
  } else if (gameName === "เกมสะกดคำ") {
    selectGame = "spellingGame";
    vMinimum = 1;
  } else if (gameName === "เกมจับผิดภาพ") {
    selectGame = "differenceGame";
    vMinimum = 12;
  } else selectGame = "/";

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const categoriesRequest = await axios.get(
          `${PROTOCOL}://${HOST}:${PORT}/${CATEGORIES}/${GAMES}/${vMinimum}`
        );
        const response = categoriesRequest.data;
        setCategories(response);
      } catch (err) {
        console.log("Error get all Categories of games: ", err);
      }
    };

    getAllCategories();
  }, []);

  return { categories, selectGame, vMinimum, gameName };
}

export default SelectGameCategoryViewModel;
