import React, { useState, useEffect } from "react";
import configBackend from "../../../config/config.backend";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SummaryScore from "../../../models/summaryScore.model";

interface Positions {
  top: number;
  left: number;
}

interface ImagesProp {
  image: string;
  nameCorrect: string;
  id: number;
}

interface NameProp {
  name: string;
  id: number;
}

type MatchingGameType = [ImagesProp[], NameProp[]];

function MatchingGameViewModel() {
  const { API_URL, GAMES, MATCHING } = configBackend;
  const location = useLocation();
  const category = location.state?.selectedCategory;

  const [statusImg, setStatusImg] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const [statusAns, setStatusAns] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  const [positionQuiz, setPositionsQuiz] = useState<Positions[]>([]);
  const [positionAnswer, setPositionsAnswer] = useState<Positions[]>([]);

  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState<number>(window.innerHeight);
  const [screen, setScreen] = useState<number[]>([]);

  const [line, setLine] = useState<string>("");

  const [vocabularies, setVocabularies] = useState<MatchingGameType>();
  const [imagesQuiz, setImagesQuiz] = useState<ImagesProp[]>([]);
  const [vAnswer, setVAnswer] = useState<NameProp[]>([]);

  const [ansCorrect, setAnsCorrect] = useState<string[]>([]);
  const [ansUser, setAnsUser] = useState<string[]>([]);

  const [showScore, setShowScore] = useState<boolean>(false);
  const [summaries, setSummaries] = useState<SummaryScore[]>([]);

  // Get vocabularies
  useEffect(() => {
    const getVocabularies = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/${GAMES}/${MATCHING}/${category}`
        );
        const vocabularies = response.data; // [0] => image , [1] => name

        setVocabularies(vocabularies);
      } catch (err) {
        console.log("Error getting vocabularies of matching game", err);
      }
    };

    getVocabularies();
  }, []);

  // separate vocabularies to image and name
  useEffect(() => {
    if (vocabularies) {
      setImagesQuiz(vocabularies?.[0]);
      setVAnswer(vocabularies[1]);
    }
  }, [vocabularies]);

  // Find width and height screen
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Set width and height screen
  useEffect(() => {
    if (screenWidth && screenHeight) {
      setScreen([screenWidth, screenHeight]);
    }
  }, [screenWidth, screenWidth]);

  useEffect(() => {
    const getLineConnectBlock = async () => {
      try {
        const response = await axios.post(`${API_URL}/${GAMES}/${MATCHING}`, {
          screen: screen,
          positionQuiz: positionQuiz,
          positionAnswer: positionAnswer,
        });

        const urlLine = response.data;

        setLine(urlLine);
      } catch (error) {
        console.log("Error sending Line connect data: ", error);
      }
    };

    getLineConnectBlock();
  }, [statusImg, statusAns, screen, positionQuiz, positionAnswer]);

  // Check Answer
  useEffect(() => {
    if (imagesQuiz) {
      const updatedSummary = imagesQuiz.map((ans, index) => ({
        img: ans.image,
        correctAns: ans.nameCorrect,
        userAns: ansUser[index],
        status: ansUser[index] === ansCorrect[index] ? "ถูก" : "ผิด",
      }));

      setSummaries(updatedSummary);
    }
  }, [ansCorrect, ansUser]);

  // Show Model
  useEffect(() => {
    if (
      statusImg.length === statusAns.length &&
      statusImg.every((value) => value === true) &&
      statusAns.every((value) => value === true)
    ) {
      setShowScore(true);
    }
  }, [statusImg, statusAns]);

  // Set Position header
  const settingPositionHeader = () => {
    const divHeader = document.querySelector("#header");

    let topHeader: number;
    if (divHeader) {
      const rect = divHeader.getBoundingClientRect();
      topHeader = rect.top;
      return topHeader; // + 40 because padding(top, bottom) and margin(top) = 40px
    }
  };

  // Set position Question
  const settingPositionQuestion = (
    divID: string,
    idStatus: number,
    question: string
  ) => {
    const topHeader = settingPositionHeader();
    const divQuestions = document.querySelector(`#${divID}`);

    if (divQuestions && topHeader) {
      const rect = divQuestions.getBoundingClientRect();

      // set position
      const pdTop = rect.top - topHeader - 60;
      const pdLeft = rect.left + rect.width - 15;

      if (statusImg[idStatus]) {
        // find position because => where filter array all []
        const positionFind = positionQuiz.find(
          (position) => position.top === pdTop && position.left === pdLeft
        );

        const positionFilter = positionQuiz.filter((position) => {
          return position !== positionFind;
        });

        setPositionsQuiz(positionFilter);
      } else {
        setPositionsQuiz((prevPosition) => [
          ...prevPosition,
          { top: pdTop, left: pdLeft },
        ]);
      }
    }

    setStatusImg((prevStatus) => {
      const updateStatus = [...prevStatus];
      updateStatus[idStatus] = !updateStatus[idStatus];

      return updateStatus;
    });

    userSelectQuestion(question, idStatus);
  };

  // Set User select Question
  const userSelectQuestion = (answer: string, idStatus: number) => {
    if (statusImg[idStatus]) {
      const quizFind = ansCorrect.find((ansCor) => ansCor == answer);
      const quizFilter = ansCorrect.filter((ansCor) => ansCor !== quizFind);

      setAnsCorrect(quizFilter);
    } else {
      setAnsCorrect((prevCN) => [...prevCN, answer]);
    }
  };

  // Set position Answer
  const settingPositionAnswer = (
    divID: string,
    idStatus: number,
    answer: string
  ) => {
    const topHeader = settingPositionHeader();
    const divAnswer = document.querySelector(`#${divID}`);

    if (divAnswer && topHeader) {
      const rect = divAnswer.getBoundingClientRect();

      // set position
      const pdTop = rect.top - topHeader - 60;
      const pdLeft = rect.right - rect.width + 30;

      if (statusAns[idStatus]) {
        // find position because => where filter array all []
        const positionFind = positionAnswer.find(
          (position) => position.top === pdTop && position.left === pdLeft
        );

        const positionFilter = positionAnswer.filter((position) => {
          return position !== positionFind;
        });

        setPositionsAnswer(positionFilter);
      } else {
        setPositionsAnswer((prevPosition) => [
          ...prevPosition,
          { top: pdTop, left: pdLeft },
        ]);
      }
    }

    setStatusAns((prevStatus) => {
      const updateStatus = [...prevStatus];
      updateStatus[idStatus] = !updateStatus[idStatus];

      return updateStatus;
    });

    userSelectAnswer(answer, idStatus);
  };

  // Set User select Answer
  const userSelectAnswer = (answer: string, idStatus: number) => {
    if (statusAns[idStatus]) {
      const answerFind = ansUser.find((ans) => ans == answer);
      const answerFilter = ansUser.filter((ans) => ans !== answerFind);

      setAnsUser(answerFilter);
    } else {
      setAnsUser((prevCN) => [...prevCN, answer]);
    }
  };

  const handleHiddenModal = () => {
    setShowScore(false);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return {
    statusImg,
    statusAns,
    settingPositionQuestion,
    settingPositionAnswer,
    line,
    imagesQuiz,
    vAnswer,
    showScore,
    handleHiddenModal,
    summaries,
  };
}

export default MatchingGameViewModel;
