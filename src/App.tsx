import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Client/Navbar/navbar.view";
import Home from "./Client/Home/home.view";
import Login from "./Client/Login/login.view";
import Vocabularies from "./Client/Teaching/Vocabularies/vocabularies.view";
import Education from "./Client/Teaching/Education/education.view";
import SelectGames from "./Client/Games/selectGames.view";
import SelectGameCategory from "./Client/Games/selectGameCategory.view";
import QuizGame from "./Client/Games/quizGame/quizGame.view";
import MatchingGame from "./Client/Games/matchingGame/matchingGame.view";
import SimulationGame from "./Client/Games/simulationGame/simulationGame.view";
import SpellingGame from "./Client/Games/spellingGame/spellingGame.view";
import DifferenceGame from "./Client/Games/differenceGame/differenceGame.view";
import Characters from "./Client/Characters/characters.view";

function App() {
  // dev on phone 4" - 4.7" = 254 * 523 px
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/vocabularies" element={<Vocabularies />} />
          <Route path="/vocabularies/education" element={<Education />} />
          <Route path="/games" element={<SelectGames />} />
          <Route path="/games/category" element={<SelectGameCategory />} />
          <Route path="/characters" element={<Characters />} />

          {/* Games */}
          <Route
            path="/games/category/matchingGame"
            element={<MatchingGame />}
          />
          <Route path="/games/category/quizGame" element={<QuizGame />} />
          <Route
            path="/games/category/simulationGame"
            element={<SimulationGame />}
          />
          <Route
            path="/games/category/spellingGame"
            element={<SpellingGame />}
          />
          <Route
            path="/games/category/differenceGame"
            element={<DifferenceGame />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
