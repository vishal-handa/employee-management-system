import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Menu from "./Menu";
import { receiveCancelledShifts } from "../../actions";

const CancelledShifts = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.cancelled.shifts);
  const ID = useSelector((state) => state.user.user.id);
  useEffect(() => {
    fetch("/get-cancelled-shifts")
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          dispatch(receiveCancelledShifts(res.data));
        }
      });
  }, []);

  const handleTakeShift = (shift) => {
    fetch("/take-cancelled-shift", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: ID,
        shift: shift,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Wrapper>
      <Menu />
      {events && (
        <table>
          <thead>
            <tr>
              <th>Shift Title</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Take Shift</th>
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
                  <td>
                    <button
                      onClick={() => handleTakeShift(elem)}
                      disabled={
                        new Date(parseInt(elem.startTime)).getTime() <
                          Date.now() &&
                        new Date(parseInt(elem.endTime)).getTime() < Date.now()
                          ? true
                          : false
                      }
                    >
                      Take Shift
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;

  table {
    width: 100%;
    margin: 10px;
  }
`;

export default CancelledShifts;
