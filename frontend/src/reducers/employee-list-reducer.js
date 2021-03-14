const initialState = {
  employees: null,
  status: "idle",
  error: null,
};

export default function employeeListReducer(state = initialState, action) {
  switch (action.type) {
    case "RECEIVE_EMPLOYEE_LIST": {
      // console.log(action);
      return {
        ...state,
        employees: action.list,
      };
    }
    default: {
      return state;
    }
  }
}
