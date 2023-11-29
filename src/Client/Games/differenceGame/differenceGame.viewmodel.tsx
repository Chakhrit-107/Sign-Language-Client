import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import configBackend from "../../../config/config.backend";
import axios from "axios";
import Vocabulary from "../../../models/vocabularies.model";
import SummaryScore from "../../../models/summaryScore.model";

interface UserSelected {
  name: string;
  image: string;
}

function DifferenceGameViewModel() {
  const location = useLocation();
  const category = location.state?.selectedCategory;

  const { API_URL, GAMES, DIFFERENCE } = configBackend;

  const [vSet1, setVSet1] = useState<Vocabulary[]>([]);
  const [vSet2, setVSet2] = useState<Vocabulary[]>([]);
  const [answersCorrect, setAnswersCorrect] = useState<Vocabulary[]>([]);

  const [statusBtn, setStatusBtn] = useState<boolean[]>([]);
  const [userSelected, setUserSelected] = useState<UserSelected[]>([]);

  const [showScore, setShowScore] = useState<boolean>(true);
  const [summaries, setSummaries] = useState<SummaryScore[]>([]);

  useEffect(() => {
    const getVocabulariesDifferenceGame = async () => {
      const response = await axios.get(
        `${API_URL}/${GAMES}/${DIFFERENCE}/${category}`
      );

      const vocabulariesSet = response.data;
      setVSet1(vocabulariesSet[0]); // set 1 ==> 9 questions
      setVSet2(vocabulariesSet[1]); // set 2 ==> 6 questions and 3 answers
      setAnswersCorrect(vocabulariesSet[2]); // answer correct 4 word
    };

    getVocabulariesDifferenceGame();
  }, []);

  useEffect(() => {
    if (vSet1 && vSet2) {
      setStatusBtn(vSet2.map(() => false));
    }
  }, [vSet1, vSet2]);

  useEffect(() => {
    if (userSelected && answersCorrect) {
      const correct: string[] = answersCorrect.map((ansCor) => ansCor.name);
      const userSelect: string[] = userSelected.map((select) => select.name);

      const answerAll = checkAnswerUserSelect(correct, userSelect);
      const newCorrect = answerAll.answer;
      const status = answerAll.status;

      const updatedSummary = userSelected.map((_, index) => {
        return {
          img: answersCorrect[index].img_normal,
          correctAns: answersCorrect[index].name,
          userAns: newCorrect[index],
          status: status[index],
        };
      });

      setSummaries(updatedSummary);
    }
  }, [userSelected]);

  const checkAnswerUserSelect = (
    answerCorrect: string[],
    userSelect: string[]
  ) => {
    const newCorrect: string[] = ["", "", ""];
    const statusAnswer: string[] = ["", "", ""];

    // check answer correct of newCorrect
    answerCorrect.forEach((cor, idCor) => {
      userSelect.forEach((select, idSelect) => {
        if (cor === select) {
          newCorrect[idCor] = cor;
          statusAnswer[idCor] = "ถูก";
        }
      });
    });

    // check answer wrong of newCorrect
    userSelect.forEach((select) => {
      newCorrect.forEach((newCor, index) => {
        if (newCor === "" && !newCorrect.includes(select)) {
          newCorrect[index] = select;
          statusAnswer[index] = "ผิด";
        }
      });
    });

    return { answer: newCorrect, status: statusAnswer };
  };

  const handleSelectAnswer = (idBtn: number, vName: string, vImage: string) => {
    setStatusBtn((prevStatus) => {
      const updateStatus = [...prevStatus];
      updateStatus[idBtn] = !updateStatus[idBtn];

      return updateStatus;
    });

    if (statusBtn[idBtn]) {
      setUserSelected(
        userSelected.filter(
          (prevSelect) =>
            prevSelect.name !== vName && prevSelect.image !== vImage
        )
      );
    } else {
      setUserSelected((prevSelect) => [
        ...prevSelect,
        { name: vName, image: vImage },
      ]);
    }
  };

  const handleHiddenModal = () => {
    setShowScore(false);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return {
    vSet1,
    vSet2,
    userSelected,
    statusBtn,
    handleHiddenModal,
    handleSelectAnswer,
    showScore,
    summaries,
  };
}

export default DifferenceGameViewModel;
