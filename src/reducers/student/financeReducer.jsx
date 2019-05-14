let stateDefault = {
  fees: null,
  job: null,
  outcomes: null
};

export default function reducer(state = stateDefault, action) {
  let newState = { ...state };

  switch (action.type) {
    case "LOAD_STUDENT_FULFILLED": {
      let user = action.payload.data;
      if (action.payload.data == undefined) {
        user = action.payload;
      }
      console.log("DEJTA", user);
      let { incomes, outcomes } = user;
      let fees = incomes.filter(income => income.type === "fee");
      let job = incomes.find(income => income.type === "job");
      outcomes = outcomes.map(outcome => {
        if (outcome.change === null) {
          outcome.change = undefined;
        }
        return outcome;
      });

      newState = { ...state, fees, job, outcomes };
      console.log("novi stejt", newState);
      break;
    }
    case "FIRST_CHOICE_FULFILLED": {
      let finance = action.payload.data;
      let { outcomes, job } = finance;
      newState = { ...state, outcomes, job };
      break;
    }
    case "SECOND_CHOICE_FULFILLED": {
      let { outcome } = action.payload.data;
      let outcomes = [...state.outcomes];
      outcomes.push(outcome);
      newState = { ...state, outcomes };
      break;
    }
  }

  return newState;
}
