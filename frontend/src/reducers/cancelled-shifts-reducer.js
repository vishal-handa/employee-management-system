const initialState = {
  shifts: null,
  status: "loading",
  error: null,
};

export default function cancelledShiftReducer(state = initialState, action) {
  switch (action.type) {
    case "RECEIVE_CANCELLED_SHIFTS": {
      return {
        ...state,
        status: "idle",
        shifts: action.shifts,
      };
    }
    default: {
      return state;
    }
  }
}
