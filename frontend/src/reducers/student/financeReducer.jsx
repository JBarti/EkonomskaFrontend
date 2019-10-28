let stateDefault = {
  fees: null,
  job: null,
  outcomes: null,
  saving: null
};

export default function reducer(state = stateDefault, action) {
  let newState = { ...state };

  switch (action.type) {
    case "LOAD_USER_FULFILLED": {
      const { data } = action.payload;
      const { user, type } = data;
      if(type !== "STUDENT") return null;
      let { incomes, outcomes } = user;
      let fees = incomes.filter(income => income.type === "fee");
      let job = incomes.find(income => income.type === "job");
      let saving = incomes.find(income => income.type === "saving");
      console.log(incomes);
      console.log(outcomes);
      outcomes = outcomes.map(outcome => {
        if (outcome.change === null) {
          outcome.change = undefined;
        }
        return outcome;
      });
      newState = { ...state, fees, job, outcomes, saving };
      break;
    }
    case "FIRST_CHOICE_FULFILLED": {
      let finance = action.payload.data;
      let { outcomes, job } = finance;
      let oldOutcomes = [...state.outcomes];
      let oldFees = [...state.fees] || [];
      oldOutcomes.push(outcomes);
      oldFees.push(job);
      newState = { ...state, outcomes: oldOutcomes, fees: oldFees };
      break;
    }
    case "SECOND_CHOICE_FULFILLED": {
      let { outcome } = action.payload.data;
      let outcomes = [...state.outcomes];
      outcomes.push(outcome);
      newState = { ...state, outcomes };
      break;
    }
    case "THIRD_CHOICE_FULFILLED": {
      let { saving } = action.payload.data;
      newState = { ...state, saving };
      break;
    }
    case "LOGOUT_USER_FULFILLED": {
      newState = stateDefault;
      break;
    }
  }

  return newState;
}
