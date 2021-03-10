import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";

import UserLogin from "./UserLogin";
import AdminLogin from "./AdminLogin";
import AdminHome from "./admin/AdminHome";
import UserHome from "./users/UserHome";
import Shifts from "./users/Shifts";

const App = () => {
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
          <Route path="/adminHome">
            <AdminHome />
          </Route>
          <Route path="/userHome">
            <UserHome />
          </Route>
          <Route path="/user-shifts">
            <Shifts />
          </Route>
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
