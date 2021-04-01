import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import Menu from "./Menu";
import moment from "moment";

const EmployeeProfile = () => {
  const { id } = useParams();
  const [empShifts, setEmpShifts] = useState();
  const [temp, setTemp] = useState([]);
  const empDetails = useSelector((state) =>
    state.allEmployees.employees.find((el) => el._id === id)
  );
  useEffect(() => {
    if (empDetails.currentStatus === "Active") {
      fetch(`/get-user-shifts/${id}`)
        .then((res) => res.json())
        .then((res) => setTemp(res.data));
    } else if (empDetails.currentStatus === "Archived") {
      fetch(`/get-archived-user/${id}`)
        .then((res) => res.json())
        .then((res) => setTemp(res.data));
    }
  }, [empDetails]);
  console.log(empDetails, temp);

  const sortFutureShifts = temp.filter(
    (el) => new Date(parseInt(el.startTime)) > Date.now()
  );

  const sortOldShifts = temp.filter(
    (el) => new Date(parseInt(el.startTime)) < Date.now()
  );

  const sortAllShifts = temp;

  const UpcomingShifts = () => {
    return setEmpShifts(sortFutureShifts);
  };

  const PastShifts = () => {
    return setEmpShifts(sortOldShifts);
  };

  const AllShifts = () => {
    return setEmpShifts(sortAllShifts);
  };

  return (
    <Wrapper>
      <Menu />
      <Container>
        {empDetails && (
          <table>
            <thead>
              <th colSpan="2">Employee Details</th>
            </thead>
            <tbody>
              <tr>
                <td>Employee ID</td>
                <td>{empDetails._id}</td>
              </tr>
              <tr>
                <td>First Name</td>
                <td>{empDetails.fname}</td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>{empDetails.lname}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{empDetails.email}</td>
              </tr>
              <tr>
                <td>Phone Number</td>
                <td>{empDetails.phoneNumber}</td>
              </tr>
            </tbody>
          </table>
        )}
        <h1>Employee Shifts</h1>
        <ButtonContainer>
          <Button1 onClick={UpcomingShifts}>Upcoming shifts</Button1>
          <Button2 onClick={PastShifts}>Past Shifts</Button2>
          <Button1 onClick={AllShifts}>All shifts</Button1>
        </ButtonContainer>
        {empShifts ? (
          <>
            <table>
              <thead>
                <tr>
                  <th>Shift Title</th>
                  <th>Shift Start</th>
                  <th>Shift End </th>
                </tr>
              </thead>
              <tbody>
                {empShifts.map((el) => {
                  return (
                    <tr>
                      <td>{el.title}</td>
                      <td>{moment(parseInt(el.startTime)).format("llll")}</td>
                      <td>{moment(parseInt(el.endTime)).format("llll")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : (
          <p>No shifts exist currently for {empDetails.fname}.</p>
        )}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;

  table {
    th {
      text-align: center;
      border: none;
    }
    td,
    tr {
      border: none;
    }
  }
`;

const Container = styled.div`
  width: inherit;
`;

const ButtonContainer = styled.div`
  width: inherit;
`;

const Button1 = styled.button`
  width: 33%;
  height: 40px;
  background-color: burlywood;
`;

const Button2 = styled.button`
  width: 33%;
  height: 40px;
`;

export default EmployeeProfile;
