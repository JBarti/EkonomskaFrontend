let stateDefault = {
  id: null,
  gradeId: null,
  firstName: null,
  lastName: null,
  email: null,
  fail: false
};

export default function reducer(state = stateDefault, action) {
  let newState = { ...state };
  switch (action.type) {
    case "LOAD_PROFFESOR_FULFILLED": {
      console.log("OVO JE PAYLOAD");
      console.log(action);
      let user = action.payload.data ? action.payload.data : action.payload;
      let { id, firstName, lastName, email } = user;
      newState = { ...state, id, firstName, lastName, email, fail: false };
      break;
    }
    case "LOAD_PROFFESOR_REJECTED": {
      console.log("OVO JE PAYLOAD");
      console.log(action);
      newState = { ...state, fail: true };
      break;
    }
  }

  return newState;
}
