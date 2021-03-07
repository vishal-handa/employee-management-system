import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";

import UserLogin from "./UserLogin";
import AdminLogin from "./AdminLogin";
import BGImage from "./images/bg.jpg";

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
        </Switch>
      </Router>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url(${BGImage});
  background-repeat: no-repeat;
  background-size: cover;
`;

export default App;
