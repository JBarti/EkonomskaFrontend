let stateDefault = {
  id: null,
  name: null,
  proffesorId: null,
  folders: null,
  notifications: null,
  financialYear: null
};

export default function reducer(state = stateDefault, action) {
  let newState = { ...state };
  switch (action.type) {
    case "LOAD_USER_FULFILLED": {
      let { data } = action.payload;
      const {type, user} = data;
      if (type !== "STUDENT") return stateDefault;
      newState = user.grade;
      break;
    }
    case "LOGOUT_USER_FULFILLED": {
      newState = stateDefault;
      break;
    }
  }

  return newState;
}
