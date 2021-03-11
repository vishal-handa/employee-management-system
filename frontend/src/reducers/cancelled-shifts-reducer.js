const initialState = {
  user: null,
  status: "loading",
  error: null,
};

export default function cancelledShiftReducer(state = initialState, action) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
