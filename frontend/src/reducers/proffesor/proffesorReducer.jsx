let stateDefault = {
  id: null,
  gradeId: null,
  firstName: null,
  lastName: null,
  email: null,
};

export default function reducer(state = stateDefault, action) {
  let newState = { ...state };
  switch (action.type) {
    case "LOAD_USER_FULFILLED": {
      const { data } = action.payload;
      const { user, type } = data;
      if(type !== "PROFFESOR") return stateDefault;
      const { id, firstName, lastName, email } = user;
      newState = { id, firstName, lastName, email};
      break;
    }
    case "LOGOUT_USER_FULFILLED": {
      newState = stateDefault;
      break;
    }
  }

  return newState;
}
