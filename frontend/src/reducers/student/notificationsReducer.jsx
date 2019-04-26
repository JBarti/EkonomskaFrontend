let stateDefault = {
  all: null
};

export default function reducer(state = stateDefault, action) {
  let newState = { ...state };

  switch (action.type) {
    case "LOAD_STUDENT_FULFILLED": {
      let user = action.payload.data ? action.payload.data : action.payload;
      let { notifications } = user;
      console.log("USER DVA", user);
      newState.all = notifications;
      break;
    }
  }

  return newState;
}
