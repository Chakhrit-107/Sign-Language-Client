import React, { useState, useEffect } from "react";
import configBackend from "../../../config/config.backend";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SummaryScore from "../../../models/summaryScore.model";
import { Positions, vMatching } from "./schema/matchingGame.schema";

type MatchingGameType = [vMatching[], vMatching[]];

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
  const [imagesQuiz, setImagesQuiz] = useState<vMatching[] | undefined>(
    undefined
  );
  const [vAnswer, setVAnswer] = useState<vMatching[]>([]);

  const [imgSelected, setImgSelected] = useState<vMatching[]>([]);
  const [textSelected, setTextSelected] = useState<vMatching[]>([]);

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

  // separate vocabularies to image and text block
  useEffect(() => {
    if (vocabularies) {
      setImagesQuiz(vocabularies?.[0]); // set image block
      setVAnswer(vocabularies[1]); // set vocabularies block
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

  // Get line connect  block
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
      const updateSummary = imagesQuiz.map((_, index) => ({
        img: imgSelected[index]?.image,
        correctAns: imgSelected[index]?.name,
        userAns:
          imgSelected[index] == textSelected[index]
            ? imgSelected[index]?.name
            : textSelected[index]?.name,
        status:
          imgSelected[index]?.name == textSelected[index]?.name ? "ถูก" : "ผิด",
      }));

      setSummaries(updateSummary);
    }
  }, [imgSelected, textSelected]);

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

  // Set position Images block
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

  // Set User select Images block
  const userSelectQuestion = (answer: string, idStatus: number) => {
    if (statusImg[idStatus]) {
      const quizFind = imgSelected.find((ansCor) => ansCor.name == answer);
      const quizFilter = imgSelected.filter((ansCor) => ansCor !== quizFind);

      setImgSelected(quizFilter);
    } else {
      const imgSelect = imagesQuiz?.find((quiz) => quiz.name == answer);
      if (imgSelect) {
        setImgSelected((prevSelected) => [...prevSelected, imgSelect]);
      }
    }
  };

  // Set position Answers block
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

  // Set User select Answers block
  const userSelectAnswer = (answer: string, idStatus: number) => {
    if (statusAns[idStatus]) {
      const answerFind = textSelected.find((ans) => ans.name == answer);
      const answerFilter = textSelected.filter((ans) => ans !== answerFind);

      setTextSelected(answerFilter);
    } else {
      const textSelect = vAnswer?.find((text) => text.name == answer);
      if (textSelect) {
        setTextSelected((prevSelected) => [...prevSelected, textSelect]);
      }
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
