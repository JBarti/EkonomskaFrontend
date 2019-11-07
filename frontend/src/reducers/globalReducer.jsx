let stateDefault = {
  userType: null,
  loadUserRejected: null,
};

export default function (state=stateDefault, action) {
  let newState = { ...state };
  switch (action.type) {
    case "LOAD_USER_FULFILLED": {
      let { data } = action.payload;
      const { type } = data;

      newState.userType = type;
      newState.loadUserRejected = false;
      break;
    }
    case "LOAD_USER_REJECTED": {
      newState.loadUserRejected = true;
      break;
    }
    case "LOAD_USER_PENDING": {
      newState.loadUserRejected = false;
      break;
    }
    case "LOGOUT_USER_FULFILLED": {
      newState = stateDefault;
      break;
    }
  }
  return newState;
}