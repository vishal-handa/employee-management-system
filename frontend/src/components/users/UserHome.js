import React, { useState } from "react";
import styled from "styled-components";
import Menu from "./Menu";
import { useSelector } from "react-redux";

const UserHome = () => {
  return (
    <Wrapper>
      <Menu />
      {"USER HOME"}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default UserHome;
