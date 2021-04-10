import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Menu from "./Menu";
import { receiveCancelledShifts } from "../../actions";

const CancelledShifts = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.cancelled.shifts);
  const ID = useSelector((state) => state.user.user.id);

  //getting cancelled shifts
  useEffect(() => {
    fetch("/get-cancelled-shifts")
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          dispatch(receiveCancelledShifts(res.data));
        }
      });
  }, []);

  //function to take cancelled shift by the logged in user.
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
      <Container>
        <Banner>Cancelled Shifts</Banner>
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
                      <TakeShift
                        onClick={() => handleTakeShift(elem)}
                        disabled={
                          new Date(parseInt(elem.startTime)).getTime() <
                            Date.now() &&
                          new Date(parseInt(elem.endTime)).getTime() <
                            Date.now()
                            ? true
                            : false
                        }
                      >
                        Take Shift
                      </TakeShift>
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

const TakeShift = styled.button`
  background-color: #03783d;
  cursor: pointer;
  padding: 10px;
  color: white;
  &:hover {
    background-color: #044527;
  }
  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`;

export default CancelledShifts;
