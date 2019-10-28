import { combineReducers } from "redux";

import proffesor from "./proffesor/proffesorReducer";
import grades from "./proffesor/gradesReducer";
import student from "./student/studentReducer";
import grade from "./student/gradeReducer";
import finance from "./student/financeReducer";
import global from "./globalReducer";

export default combineReducers({
  global,
  proffesor,
  grades,
  student,
  grade,
  finance
});
