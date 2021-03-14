import React, { useState } from "react";
import styled from "styled-components";
import Menu from "./Menu";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const adminState = useSelector((state) => state.admin.admin);
  // console.log(adminState);
  return (
    <Wrapper>
      <Menu />
      <div>
        <p>{`Welcome ${adminState.fname} !`}</p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default AdminHome;
