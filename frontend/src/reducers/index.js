import { combineReducers } from "redux";
import cancelled from "./cancelled-shifts-reducer";
import user from "./user-shift-reducer";
import swap from "./swap-shifts-reducer";
import logInCheck from "./hasLoggedIn-reducer";

export default combineReducers({ user, cancelled, swap, logInCheck });
