import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import moment from "moment";
import Menu from "./Menu";

const CancelledShiftsAdmin = () => {
  //list of cancelled shifts from the state.
  const events = useSelector((state) => state.cancelled.shifts);

  return (
    <Wrapper>
      <Menu />
      <Container>
        <Banner>Cancelled Shifts</Banner>
        {events && (
          <table>
            <thead>
              <tr>
                <th>Shift Title</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody>
              {events.map((elem, index) => {
                return (
                  <tr key={index}>
                    <td>{elem.title}</td>
                    <td>
                      {moment(parseInt(elem.startTime)).local().format("LLLL")}
                    </td>
                    <td>
                      {moment(parseInt(elem.endTime)).local().format("LLLL")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;

  table {
    width: 100%;
    th {
      background-color: #4b4b4b;
      color: white;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: inherit;
`;

const Banner = styled.p`
  width: 100%;
  color: black;
  padding: 50px 0px 50px 10px;
  font-size: 3em;
  font-weight: 900;
`;

export default CancelledShiftsAdmin;
