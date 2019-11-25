const API_ENDPOINT = "https://f-pismenost.herokuapp.com";
const API_ENDPOINTL = "http://0.0.0.0:3001";


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
