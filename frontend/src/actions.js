export const setLogIn = () => ({
  type: "SET_LOG_IN",
});

export const setLogOut = () => ({
  type: "SET_LOG_OUT",
});

export const receiveUserProfile = (profile) => ({
  type: "RECEIVE_USER_PROFILE",
  profile,
});

export const receiveAdminProfile = (profile) => ({
  type: "RECEIVE_ADMIN_PROFILE",
  profile,
});

export const receieveEmployeeList = (list) => ({
  type: "RECEIVE_EMPLOYEE_LIST",
  list,
});

export const receieveAllShifts = (shifts) => ({
  type: "RECEIVE_ALL_SHIFTS",
  shifts,
});

export const updateUserShifts = (shifts) => ({
  type: "UPDATE_USER_SHIFTS",
  shifts,
});

export const receiveCancelledShifts = (shifts) => ({
  type: "RECEIVE_CANCELLED_SHIFTS",
  shifts,
});

export const receiveUserDetails = (details) => ({
  type: "RECEIVE_USER_DETAILS",
  details,
});
