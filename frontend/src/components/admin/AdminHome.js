import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Menu from "./Menu";
import { useSelector, useDispatch } from "react-redux";
import { receieveAllShifts, receieveEmployeeList } from "../../actions";

const AdminHome = () => {
  const dispatch = useDispatch();
  const adminState = useSelector((state) => state.admin.admin);
  useEffect(() => {
    fetch("/get-all-shifts")
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          dispatch(receieveAllShifts(res.data));
        }
      });
    fetch("/employee-list")
      .then((res) => res.json())
      .then((res) => dispatch(receieveEmployeeList(res.data)));
  });
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
