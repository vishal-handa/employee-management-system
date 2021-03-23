import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Menu from "./Menu";

const CancelledShifts = () => {
  return (
    <Wrapper>
      <Menu />
      {"cancelled shifts"}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default CancelledShifts;
