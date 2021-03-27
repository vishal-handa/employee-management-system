import { combineReducers } from "redux";
import cancelled from "./cancelled-shifts-reducer";
import user from "./user-shift-reducer";
import swap from "./swap-shifts-reducer";
import logInCheck from "./hasLoggedIn-reducer";
import admin from "./admin-reducer";
import allEmployees from "./employee-list-reducer";
import allShifts from "./all-shifts-reducer";
import userDetails from "./user-details-reducer";

export default combineReducers({
  user,
  cancelled,
  swap,
  logInCheck,
  admin,
  allEmployees,
  allShifts,
  userDetails,
});
