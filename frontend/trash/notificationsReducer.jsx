let stateDefault = {
  all: null
};

export default function reducer(state = stateDefault, action) {
  let newState = { ...state };

  switch (action.type) {
    case "LOAD_STUDENT_FULFILLED": {
      const { data } = action.payload;
      const { user, type } = data;
      if (type !== "STUDENT") return stateDefault;
      let { notifications } = user;
      newState = { all: notifications };
      break;
    }
    case "LOGOUT_USER_FULFILLED": {
      newState = stateDefault;
      break;
    }
  }

  return newState;
}
