const initialState = {
  user: null,
  status: "loading",
  error: null,
};

export default function userShiftReducer(state = initialState, action) {
  switch (action.type) {
    case "RECEIVE_USER_PROFILE": {
      return {
        ...state,
        status: "idle",
        user: action.profile,
      };
    }
    default: {
      return state;
    }
  }
}
