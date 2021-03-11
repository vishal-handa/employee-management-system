const initialState = {
  user: null,
  status: "loading",
  error: null,
};

export default function swapShiftReducer(state = initialState, action) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
