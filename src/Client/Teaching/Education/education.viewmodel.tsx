import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import configBackend from "../../../config/config.backend";
import Character from "../../../models/character.model";
import Vocabulary from "../../../models/vocabularies.model";
import axios from "axios";

function EducationViewModal() {
  const { API_URL, CHARACTER_SIGN_LANGUAGE, VOCABULARIES, USERINPUT } =
    configBackend;

  const location = useLocation();

  const vocabulary: string = location.state?.name;
  const imgNormal: string = location.state?.imgNormal;
  const imgSign: string = location.state?.imgSign;
  const videoSign: string = location.state?.video;

  const inputVocabulary: string = location.state?.userInput;

  const [characters, setCharacters] = useState<Character[]>([]);
  const [vocabularyInput, setVocabularyInput] = useState<Vocabulary>();
  const [foundVocabulary, setFoundVocabulary] = useState<boolean>(true);

  useEffect(() => {
    const getCharacterByCategory = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/${CHARACTER_SIGN_LANGUAGE}/${
            inputVocabulary ? inputVocabulary : vocabulary
          }`
        );
        const character = response.data;
        setCharacters(character);
      } catch (err) {
        console.log("Error get character: ", err);
      }
    };

    getCharacterByCategory();
  }, []);

  useEffect(() => {
    const getVocabularyUser = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/${VOCABULARIES}/${USERINPUT}/${inputVocabulary}`
        );

        if (response.data.length === 0) {
          setFoundVocabulary(false);
        } else {
          const vocabularyFound = response.data[0];
          setVocabularyInput(vocabularyFound);
        }
      } catch (err) {
        console.log("Error get vocabulary: ", err);
      }
    };

    getVocabularyUser();
  }, []);

  return {
    vocabulary,
    imgNormal,
    imgSign,
    videoSign,
    characters,
    vocabularyInput,
    foundVocabulary,
  };
}

export default EducationViewModal;
