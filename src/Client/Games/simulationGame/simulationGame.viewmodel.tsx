import React, { useEffect, useState } from "react";
import axios from "axios";
import configBackend from "../../../config/config.backend";
import SimulationQuiz from "../../../models/simulationQuiz.model";
import Summary from "./schema/summary.schema";

interface Choice {
  name: string;
  image: string;
  image_sign: string;
}

function SimulationGameViewModel() {
  const { PROTOCOL, HOST, PORT, GAMES, SIMULATION } = configBackend;

  const [questions, setQuestions] = useState<SimulationQuiz[]>([]);
  const [answer, setAnswer] = useState<SimulationQuiz>();
  const [choices, setChoices] = useState<Choice[]>([]);

  const [userSelected, setUserSelected] = useState<string[]>([]);
  const [statusChoice, setStatusChoice] = useState<boolean[]>([]);
  const [showScore, setShowScore] = useState<boolean>(false);

  const [summary, setSummary] = useState<Summary>();

  // GET Questions of Simulation game
  useEffect(() => {
    const getQuestionSimulationGame = async () => {
      try {
        const response = await axios.get(
          `${PROTOCOL}://${HOST}:${PORT}/${GAMES}/${SIMULATION}`
        );
        const quizzes = response.data;

        setQuestions(quizzes);
      } catch (err) {
        console.log("Error get question for simulation game: ", err);
      }
    };

    getQuestionSimulationGame();
  }, []);

  // Set Answer and Choices
  useEffect(() => {
    if (questions) {
      questions.map((quiz) => {
        setChoices((prevChoice) => [
          ...prevChoice,
          {
            name: quiz.answer_A,
            image: quiz.image_A,
            image_sign: quiz.image_sign_A,
          },
          {
            name: quiz.answer_B,
            image: quiz.image_B,
            image_sign: quiz.image_sign_B,
          },
        ]);
      });

      setAnswer(questions[0]); // array questions[0] ==> Answer
    }
  }, [questions]);

  // shuffle choices and set status each choices
  useEffect(() => {
    if (choices) {
      const newChoices = choices.slice(0, 6); // Slice array => [0, ..., 5]
      const shuffleChoices = shuffleArray(newChoices);
      setChoices(shuffleChoices);

      // Set status each choices
      newChoices.map(() => {
        setStatusChoice((prevStatus) => [...prevStatus, false]);
      });
    }
  }, [answer]);

  // Show Score Modal and Check answer
  useEffect(() => {
    const answerRecheck = []; //  Check between User selected and answer correct
    if (answer) {
      if (userSelected.includes(answer?.answer_A)) {
        answerRecheck[0] = answer?.answer_A; // answer "A" correct
      } else {
        const notFoundA = userSelected.filter(
          (select) => select !== answer?.answer_A // answer "A" incorrect
        );
        answerRecheck[0] = notFoundA[0];
      }

      if (userSelected.includes(answer?.answer_B)) {
        answerRecheck[1] = answer?.answer_B; // answer "B" correct
      } else {
        answerRecheck[1] = userSelected[1]; // answer "B" incorrect
      }

      const summaryScore = {
        video: answer?.question,
        description: answer?.description,
        select_A: answerRecheck[0],
        select_B: answerRecheck[1],
        answer_A: answer?.answer_A,
        answer_B: answer?.answer_B,
        status_A: answerRecheck[0] === answer?.answer_A ? "ถูก" : "ผิด",
        status_B: answerRecheck[1] === answer?.answer_B ? "ถูก" : "ผิด",
      };

      setSummary(summaryScore);
    }

    if (userSelected.length >= 2) {
      setShowScore(true);
    }
  }, [userSelected]);

  const shuffleArray = (array: Choice[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handelUserSelected = (selected: string, index: number) => {
    setStatusChoice((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[index] = !newStatus[index];

      return newStatus;
    });

    if (!statusChoice[index]) {
      setUserSelected((prevSelected) => [...prevSelected, selected]);
    } else {
      const userUnSelect = userSelected.filter((select) => select !== selected);
      setUserSelected(userUnSelect);
    }
  };

  const handleCloseModal = () => {
    setShowScore(false);
    window.location.reload();
  };

  return {
    answer,
    choices,
    statusChoice,
    userSelected,
    handelUserSelected,
    handleCloseModal,
    showScore,
    summary,
  };
}

export default SimulationGameViewModel;
