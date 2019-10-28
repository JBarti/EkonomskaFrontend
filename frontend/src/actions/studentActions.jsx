import axios from "axios";
import { API_ENDPOINT } from "../data/apiRoutes";

axios.defaults.withCredentials = true;


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
    type: "LOAD_USER",
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

export function newJob(variant, studentId) {
  console.log({ variant, studentId });
  return {
    type: "FIRST_CHOICE",
    payload: axios.post(API_ENDPOINT + "/students/year/1", {
      variant,
      studentId
    })
  };
}

export function unexpectedOutcome(studentId, variant) {
  console.log({ studentId, variant });
  return {
    type: "SECOND_CHOICE",
    payload: axios.post(API_ENDPOINT + "/students/year/2", {
      studentId,
      variant
    })
  };
}

export function updateOutcomes(studentId, outcomes) {
  return {
    type: "UPDATE_OUTCOMES",
    payload: axios.post(API_ENDPOINT + "/students/outcomes", {
      studentId,
      outcomes
    })
  };
}

export function newInvestment(studentId, totalSavings, variant) {
  return {
    type: "THIRD_CHOICE",
    payload: axios.post(API_ENDPOINT + "/students/year/3", {
      studentId,
      totalSavings,
      variant
    })
  };
}
