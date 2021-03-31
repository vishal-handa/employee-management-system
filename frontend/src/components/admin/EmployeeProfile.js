import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import Menu from "./Menu";

const EmployeeProfile = () => {
  const { id } = useParams();
  const [empProfile, setEmpProfile] = useState();
  const empDetails = useSelector((state) =>
    state.allEmployees.employees.find((el) => el._id === id)
  );
  useEffect(() => {
    if (empDetails.currentStatus === "Active") {
      fetch(`/get-user-shifts/${id}`)
        .then((res) => res.json())
        .then((res) => setEmpProfile(res.data));
    } else if (empDetails.currentStatus === "Archived") {
      fetch(`/get-archived-user/${id}`)
        .then((res) => res.json())
        .then((res) => setEmpProfile(res.data));
    }
  }, [empDetails]);
  console.log(empProfile, empDetails);

  return (
    <Wrapper>
      <Menu />
      <div></div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default EmployeeProfile;
