const api_url = "http://localhost:8800";

export default {
  API_URL: process.env.xESL_config_server || api_url,
  AUTHENTICATION: "authentication",
  LOGIN: "login",
  REGISTER: "register",
  VERIFY: "verify",
  CATEGORIES: "categories",
  VOCABULARIES: "vocabularies",
  CHARACTER_SIGN_LANGUAGE: "character",
  USERINPUT: "userInput",
  GAMES: "games",
  QUIZ: "quiz",
  SPELLING: "spelling",
  MATCHING: "matching",
  DIFFERENCE: "difference",
  SIMULATION: "simulation",
};
