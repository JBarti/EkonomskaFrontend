let stateDefault = {
  id: null,
  gradeId: null,
  firstName: null,
  lastName: null,
  email: null,
  solutions: [],
};

export default function reducer(state = stateDefault, action) {
  let newState = { ...state };
  switch (action.type) {
    case "LOAD_USER_FULFILLED": {
      let { data } = action.payload;
      let { user, type } = data;
      if(type !== "STUDENT") return null;
      newState = {
        id: user.id,
        gradeId: user.gradeId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        solutions: user.solutions,
      };
      break;
    }
    case "SOLVE_TEST_FULFILLED": {
      let oldSolutions = state.solutions;
      let solutions = action.payload.data;
      oldSolutions.push(solutions);
      console.log(solutions);
      newState = { ...state, solutions: oldSolutions };
      break;
    }
    case "LOAD_USER_FAILED": {
      newState = { ...state, fail: true };
      break;
    }
    case "LOGOUT_USER_FULFILLED": {
      newState = stateDefault;
      break;
    }
  }

  return newState;
}
