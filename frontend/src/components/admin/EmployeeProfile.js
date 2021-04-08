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

  //following useEffect runs only when id or empDetails are updated. Based on currentStatus that the employee has, employee shifts are fetched from the server. Server action is required here to fetch the most update data.
  useEffect(() => {
    if (empDetails.currentStatus === "Active") {
      fetch(`/get-user-shifts/${id}`)
        .then((res) => res.json())
        .then((res) => setTemp(res.data));
    } else if (empDetails.currentStatus === "Archived") {
      fetch(`/get-archived-user/${id}`)
        .then((res) => res.json())
        .then((res) => setTemp(res.data));
    } else if (empDetails.currentStatus === "Retired") {
      fetch(`/get-retired-user/${id}`)
        .then((res) => res.json())
        .then((res) => setTemp(res.data));
    }
  }, [empDetails, id]);
  console.log(empDetails, temp);

  //employee shifts are sorted here with upcoming, past and all shifts filters.
  const sortFutureShifts = temp.filter(
    (el) => new Date(parseInt(el.startTime)) > Date.now()
  );

  const sortOldShifts = temp.filter(
    (el) => new Date(parseInt(el.startTime)) < Date.now()
  );

  const sortAllShifts = temp;

  //following functions set the empShifts state with appropriate filtered data
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
        <Banner>Employee Details</Banner>
        {empDetails && (
          <Div>
            <table>
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
          </Div>
        )}
        <Banner>Employee Shifts</Banner>

        <ButtonContainer>
          <Button onClick={UpcomingShifts}>Upcoming shifts</Button>
          <Button onClick={PastShifts}>Past Shifts</Button>
          <Button onClick={AllShifts}>All shifts</Button>
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
`;

const Banner = styled.p`
  width: 100%;
  color: black;
  padding: 50px 0px 50px 10px;
  font-size: 3em;
  font-weight: 900;
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  table {
    td,
    tr {
      border: none;
    }
    td:nth-child(1) {
      font-weight: 950;
    }
  }
`;

const Container = styled.div`
  width: inherit;
`;

const ButtonContainer = styled.div`
  width: inherit;

  background-color: black;
`;

const Button = styled.button`
  height: 40px;
  width: 33.33%;
  background: transparent;
  color: white;
  cursor: pointer;
  padding: 0px 20px 0px 20px;
  &:hover {
    background-color: gray;
  }
`;

export default EmployeeProfile;
