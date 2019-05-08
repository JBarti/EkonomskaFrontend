import axios from "axios";

axios.defaults.withCredentials = true;

const API_ENDPOINT = "https://f-pismenost.herokuapp.com";
const API_ENDPOINTL = "http://0.0.0.0:3001";

export function loadStudent(email, password) {
  return {
    type: "LOAD_STUDENT",
    payload: axios.post(
      API_ENDPOINT + "/login",
      { email, password },
      {
        Headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    )
  };
}

export function logOut() {
  return {
    type: "LOGOUT_STUDENT",
    payload: axios.get(API_ENDPOINT + "/students/logout")
  };
}

export function registerStudent(firstName, lastName, email, password, grade) {
  return {
    type: "REGISTER_STUDENT",
    payload: axios.post(API_ENDPOINT + "/students/register", {
      firstName,
      lastName,
      email,
      password,
      grade
    })
  };
}

export function loadSession() {
  return {
    type: "LOAD_STUDENT",
    payload: axios.get(API_ENDPOINT + "/students/")
  };
}

export function solveTest(testId, answers, studentId) {
  return {
    type: "SOLVE_TEST",
    payload: axios.post(API_ENDPOINT + "/students/test/solve", {
      testId,
      answers,
      studentId
    })
  };
}

export function newJob(jobName, jobPayment, jobCredit, studentId) {
  console.log({ jobName, jobPayment, jobCredit, studentId });
  return {
    type: "NEW_JOB",
    payload: axios.post(API_ENDPOINT + "/students/year/1", {
      jobName,
      jobPayment,
      jobCredit,
      studentId
    })
  };
}
