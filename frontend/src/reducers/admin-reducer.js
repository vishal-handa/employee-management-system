const initialState = {
  admin: null,
  status: "loading",
  error: null,
};

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case "RECEIVE_ADMIN_PROFILE": {
      return {
        ...state,
        status: "idle",
        admin: action.profile,
      };
    }
    default: {
      return state;
    }
  }
}
