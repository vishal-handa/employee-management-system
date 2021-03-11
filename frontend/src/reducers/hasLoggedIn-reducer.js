const initialState = {
  hasLoggedIn: false,
};

export default function hasLoggedInReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_LOG_IN": {
      return {
        ...state,
        hasLoggedIn: true,
      };
    }
    default: {
      return state;
    }
  }
}
