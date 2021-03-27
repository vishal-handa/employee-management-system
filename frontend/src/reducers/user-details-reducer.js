const initialState = {
  profile: null,
  status: "loading",
  error: null,
};

export default function userShiftReducer(state = initialState, action) {
  switch (action.type) {
    case "RECEIVE_USER_DETAILS": {
      return {
        ...state,
        status: "idle",
        profile: action.details,
      };
    }
    default: {
      return state;
    }
  }
}
