import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";

import UserLogin from "./UserLogin";
import AdminLogin from "./AdminLogin";
import AdminHome from "./admin/AdminHome";
import UserHome from "./users/UserHome";
import Shifts from "./users/Shifts";
import EditShifts from "./users/EditShifts";
import EmployeeList from "./admin/EmployeeList";
import UserShifts from "./admin/UserShifts";
import NewUser from "./NewUser";
import CancelledShifts from "./users/CancelledShifts";
import UserProfile from "./users/UserProfile";
import SendMail from "./admin/SendMail";
import EmployeeProfile from "./admin/EmployeeProfile";

const App = () => {
  const loginCheck = useSelector((state) => state.logInCheck.hasLoggedIn);
  // console.log(loginCheck);

  return (
    <Wrapper>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path="/">
            <UserLogin />
          </Route>
          <Route path="/admin">
            <AdminLogin />
          </Route>
          <Route path="/new-user">
            <NewUser />
          </Route>
          {loginCheck === true ? (
            <Route path="/adminHome">
              <AdminHome />
            </Route>
          ) : (
            <Redirect to="/" exact />
          )}
          {loginCheck === true ? (
            <Route path="/userHome">
              <UserHome />
            </Route>
          ) : (
            <Redirect to="/" exact />
          )}
          {loginCheck === true ? (
            <Route path="/user-shifts">
              <Shifts />
            </Route>
          ) : (
            <Redirect to="/" exact />
          )}
          {loginCheck === true ? (
            <Route path="/edit-shifts">
              <EditShifts />
            </Route>
          ) : (
            <Redirect to="/" exact />
          )}
          {loginCheck === true ? (
            <Route path="/user-profile">
              <UserProfile />
            </Route>
          ) : (
            <Redirect to="/" exact />
          )}
          {loginCheck === true ? (
            <Route path="/employee-list">
              <EmployeeList />
            </Route>
          ) : (
            <Redirect to="/" exact />
          )}
          {loginCheck === true ? (
            <Route path="/see-all-shifts">
              <UserShifts />
            </Route>
          ) : (
            <Redirect to="/" exact />
          )}
          {loginCheck === true ? (
            <Route path="/cancelled-shifts">
              <CancelledShifts />
            </Route>
          ) : (
            <Redirect to="/" exact />
          )}
          {loginCheck === true ? (
            <Route path="/mail-shifts">
              <SendMail />
            </Route>
          ) : (
            <Redirect to="/" exact />
          )}
          {loginCheck === true ? (
            <Route path="/employee/:id">
              <EmployeeProfile />
            </Route>
          ) : (
            <Redirect to="/" exact />
          )}
        </Switch>
      </Router>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
`;

export default App;
