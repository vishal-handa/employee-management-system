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
    case "SET_LOG_OUT": {
      return {
        ...state,
        hasLoggedIn: false,
      };
    }
    default: {
      return state;
    }
  }
}
