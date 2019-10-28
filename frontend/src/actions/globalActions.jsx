import axios from "axios";
import { dispatch } from "react-redux"
import { API_ENDPOINT } from "../data/apiRoutes";


export function loadStudent(email, password) {
  return {
    type: "LOAD_USER",
    payload: axios.get(
      API_ENDPOINT + "/login",
      {
        auth: {
          username: email,
          password: password,
        },
        withCredentials: true,
      }
    )
  };
}

export function logoutUser() {
  return {
    type: "LOGOUT_USER",
    payload: axios.get(
      API_ENDPOINT + "/logout",
    )
  }
}