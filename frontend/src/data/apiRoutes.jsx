const API_ENDPOINTL = "https://f-pismenost.herokuapp.com";
const API_ENDPOINT = "http://0.0.0.0:3001";

const UCENIK = {
  post: {
    login: "/students/login",
    register: "/students/register",
    solveTest: "/students/test/solve"
  },
  get: {
    test: "/students/",
    logout: "/students/logout",
    data: "/students/get"
  }
};

module.exports = { API_ENDPOINT, UCENIK };
