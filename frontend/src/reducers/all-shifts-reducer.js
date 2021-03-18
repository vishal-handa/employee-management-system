const initialState = {
  users: null,
  status: "loading",
  error: null,
};

export default function allShiftsReducer(state = initialState, action) {
  // console.log(action);
  switch (action.type) {
    case "RECEIVE_ALL_SHIFTS": {
      // console.log(action);
      return {
        ...state,
        users: action.shifts,
        status: "idle",
      };
    }
    default: {
      return state;
    }
  }
}
