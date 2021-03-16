import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import moment from "moment";
import Menu from "./Menu";

const EditShifts = () => {
  const events = Object.values(useSelector((state) => state.user.user.shifts));
  const handleCancellingShifts = (ev, object) => {
    ev.preventDefault();
    console.log(object);
  };
  return (
    <Wrapper>
      <Menu />
      <table>
        <thead>
          <tr>
            <th>Shift Title</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Cancel Shift</th>
            <th>Swap Shift</th>
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
                <td>{moment(parseInt(elem.endTime)).local().format("LLLL")}</td>
                <td>
                  <button onClick={(ev) => handleCancellingShifts(ev, elem)}>
                    Cancel
                  </button>
                </td>
                <td>
                  <button>Swap</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  table {
    border-collapse: collapse;
    width: 100%;
    margin: 10px;
  }

  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
    border: 1px solid gray;
  }
`;

export default EditShifts;
