import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { receieveEmployeeList } from "../../actions";
import Menu from "./Menu";

const EmployeeList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("/employee-list")
      .then((res) => res.json())
      .then((res) => dispatch(receieveEmployeeList(res.data)));
  }, []);
  return (
    <Wrapper>
      <Menu />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default EmployeeList;
