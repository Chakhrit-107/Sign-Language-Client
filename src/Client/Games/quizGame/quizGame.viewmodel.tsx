import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import configBackend from "../../../config/config.backend";
import Vocabulary from "../../../models/vocabularies.model";
import SummaryScore from "../../../models/summaryScore.model";

type Question = [
  Vocabulary[],
  Vocabulary[],
  Vocabulary[],
  Vocabulary[],
  Vocabulary[]
];

function QuizGameViewModel() {
  const location = useLocation();
  const category: string = location.state?.selectedCategory;

  const { PROTOCOL, HOST, PORT, GAMES, QUIZ } = configBackend;

  const [count, setCount] = useState<number>(0);
  const [questions, setQuestions] = useState<Question>();

  const [imgSign, setImgSign] = useState<string[]>([]);
  const [ansUser, setAnsUser] = useState<string[]>([]);
  const [ansCorrect, setAnsCorrect] = useState<string[]>([]);

  const [showScore, setShowScore] = useState<boolean>(false);
  const [summaries, setSummaries] = useState<SummaryScore[]>([]);

  // Array question
  // [0] => array question 1
  // [1] => array question 2
  // [2] => array question 3
  // [3] => array question 4
  // [4] => array question 5
  // [5] => array answer

  useEffect(() => {
    const getQuestions = async () => {
      const response = await axios.get(
        `${PROTOCOL}://${HOST}:${PORT}/${GAMES}/${QUIZ}/${category}`
      );
      const vocabularies = response.data;

      const quiz = vocabularies.slice(0, vocabularies.length - 1); // question
      setQuestions(quiz);

      const answer = vocabularies[vocabularies.length - 1]; // answer correct

      const imgSign = answer.map(
        (vocabulary: any) =>
          `${PROTOCOL}://${HOST}:${PORT}/${vocabulary.img_sign_language}` // update answer url img sign language
      );

      const ansCor = answer.map((vocabulary: any) => vocabulary.name); // answer vocabulary correct

      setImgSign(imgSign);
      setAnsCorrect(ansCor);
    };

    getQuestions();
  }, []);

  useEffect(() => {
    if (ansUser) {
      checkAnswerScore();
    }
  }, [ansUser]);

  const onChangeQuestion = (vSelect: string) => {
    setAnsUser((preVocabulary) => [...preVocabulary, vSelect]);
    if (count < 4) {
      setCount((prevCount) => prevCount + 1);
    } else {
      setShowScore(true);
    }
  };

  const checkAnswerScore = () => {
    const updatedSummary = imgSign.map((url, index) => ({
      img: url,
      correctAns: ansCorrect[index],
      userAns: ansUser[index],
      status: ansCorrect[index] === ansUser[index] ? "ถูก" : "ผิด",
    }));

    setSummaries(updatedSummary);
  };

  const handleHiddenModal = () => {
    setShowScore(false);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return {
    count,
    imgSign,
    questions,
    onChangeQuestion,
    showScore,
    summaries,
    handleHiddenModal,
  };
}

export default QuizGameViewModel;
