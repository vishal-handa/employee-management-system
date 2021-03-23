import React, { useState } from "react";
import styled from "styled-components";
import Menu from "./Menu";
import { useSelector } from "react-redux";

const UserHome = () => {
  const userState = useSelector((state) => state.user.user);
  return (
    <Wrapper>
      <Menu />
      <div>
        <p>{`Welcome ${userState.fname} !`}</p>
        <p>
          Please click on the icons to view your upcoming shifts and edit them.
        </p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default UserHome;
