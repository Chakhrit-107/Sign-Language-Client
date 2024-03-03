import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import configBackend from "../../../config/config.backend";
import Vocabulary from "../../../models/vocabularies.model";
import axios from "axios";

type Vocabularies = [Vocabulary[], Vocabulary[], Vocabulary[]];

function SpellingGameViewModel() {
  const location = useLocation();
  const category: string = location.state?.selectedCategory;

  const { API_URL, GAMES, SPELLING } = configBackend;

  // [0] => answer
  // [1] => random character
  // [2] => random character

  const [vRandom, setVRandom] = useState<Vocabularies>();
  const [svCorrect, setSVCorrect] = useState<string[]>([]);
  const [imgQuestion, setImgQuestion] = useState<string | undefined>(undefined);
  const [svQuestion, setSVQuestion] = useState<string[]>([]);

  const [userSelect, setUserSelect] = useState<string[]>([]);

  // const [charQuestion, setCharQuestion] = useState<string[]>([]);
  const [statusBtn, setStatusBtn] = useState<boolean[]>([]);

  // set status button all => false
  useEffect(() => {
    if (svQuestion) {
      setStatusBtn(svQuestion.map(() => false));
    }
  }, [svQuestion]);

  // GET Spelling vocabularies from api
  useEffect(() => {
    const getSpellingVocabulary = async () => {
      const response = await axios.get(
        `${API_URL}/${GAMES}/${SPELLING}/${category}`
      );

      const vocabularies = response.data;
      setVRandom(vocabularies);
    };

    getSpellingVocabulary();
  }, []);

  // Set and separate => img and character answer && question character
  useEffect(() => {
    if (vRandom) {
      const vocabularies = [];

      vocabularies.push(vRandom[0].map((vr) => vr.name).toString());
      vocabularies.push(vRandom[1].map((vr) => vr.name).toString());
      vocabularies.push(vRandom[2].map((vr) => vr.name).toString());

      setSVQuestion(vocabularies.join("").split(""));
      setSVCorrect(
        vRandom[0]
          .map((vr) => vr.name)
          .toString()
          .split("")
      );

      const imgURL = vRandom[0].map((vr) => vr.img_normal).toString();
      const updateURL = `${API_URL}/${imgURL}`;
      setImgQuestion(updateURL);
    }
  }, [vRandom]);

  useEffect(() => {
    if (userSelect.length > 0) {
      handleCheckAnswer();
    }
  }, [statusBtn, userSelect]);

  useEffect(() => {
    randomIndexCharacter();
  }, [svCorrect]);

  // Random character question
  const randomIndexCharacter = () => {
    const randomCharQuestion: string[] = [];
    const checkIndex: number[] = [];
    let randomIndex;

    svQuestion.forEach(() => {
      do {
        randomIndex = Math.floor(Math.random() * svQuestion.length);
      } while (checkIndex.includes(randomIndex));

      checkIndex.push(randomIndex);
      randomCharQuestion.push(svQuestion[randomIndex]);
    });

    setSVQuestion(randomCharQuestion);
  };

  // on user click Select character
  const handleSelectCharacter = (sChar: string, index: number) => {
    setStatusBtn((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[index] = !newStatus[index];
      return newStatus;
    });

    setUserSelect((prevSelectChar) => {
      const updatedSelectChar = [...prevSelectChar];
      if (statusBtn[index]) {
        return updatedSelectChar.filter((char) => char !== sChar);
      } else {
        updatedSelectChar.push(sChar);
        return updatedSelectChar;
      }
    });
  };

  const handleCheckAnswer = () => {
    if (
      svCorrect.length === userSelect.length &&
      svCorrect.every((value, index) => value === userSelect[index])
    ) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "ตอบถูก",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.reload();
      });
    } else if (
      svCorrect.length === userSelect.length &&
      svCorrect.some((value, index) => value !== userSelect[index])
    ) {
      Swal.fire({
        title: "ตอบผิด",
        html: `<br> คำตอบที่ถูกต้อง :  ${svCorrect.join("")}<br>
                    คำตอบของคุณ :  ${userSelect.join("")}
        `,
        icon: "error",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "ข้อถัดไป",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        } else {
          window.location.reload();
        }
      });
    }
  };

  return {
    category,
    svQuestion,
    statusBtn,
    userSelect,
    handleSelectCharacter,
    imgQuestion,
    svCorrect,
  };
}

export default SpellingGameViewModel;
