import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";

import UserLogin from "./UserLogin";
import AdminLogin from "./AdminLogin";

const App = () => {
  return (
    <Wrapper>
      <Router>
        <Switch>
          <Route exact path="/">
            <UserLogin />
          </Route>
          <Route path="/admin">
            <AdminLogin />
          </Route>
        </Switch>
      </Router>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default App;
