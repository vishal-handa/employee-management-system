import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Menu from "./Menu";
import moment from "moment";

const SendMail = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredShifts, setFilteredShifts] = useState([]);

  const empDetails = useSelector(
    (state) => state.allEmployees.employees
  ).filter((el) => el.currentStatus === "Active");

  const empShifts = useSelector((state) => state.allShifts.users);

  const handleShiftFilter = () => {
    let dateStart = new Date(
      new Date(startDate).getTime() + 14400000
    ).getTime();
    let dateEnd = new Date(new Date(endDate).getTime() + 14400000).getTime();
    let shiftFilter = empShifts.map((elem) => {
      return {
        ...elem,
        userProfile: {
          ...elem.userProfile,
          shifts: elem.userProfile.shifts.filter((el) => {
            if (
              parseInt(el.startTime) > dateStart &&
              parseInt(el.endTime) < dateEnd
            ) {
              return el;
            }
          }),
        },
      };
    });

    const shiftsWithEmails = shiftFilter.map((elem) => {
      return {
        ...elem,
        userProfile: {
          ...elem.userProfile,
          email: empDetails.find((el) => el._id === elem.id).email,
        },
      };
    });
    setFilteredShifts(shiftsWithEmails);
  };

  return (
    <Wrapper>
      <Menu />
      <Container>
        <h1>Notify invigilators</h1>
        <div>
          <span>
            <b>Start Date: </b>
          </span>
          <span>
            <input
              type="date"
              value={startDate}
              onChange={(ev) => setStartDate(ev.target.value)}
            />
          </span>
        </div>
        <div>
          <span>
            <b>End Date: </b>
          </span>
          <span>
            <input
              type="date"
              value={endDate}
              onChange={(ev) => setEndDate(ev.target.value)}
            />
          </span>
        </div>
        <button onClick={handleShiftFilter}>Get appropriate shifts</button>
        <button>Send Emails</button>
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Shift Title</th>
              <th>Shift Start</th>
              <th>Shift End </th>
            </tr>
          </thead>
          {filteredShifts && (
            <tbody>
              {filteredShifts.map((elem, index) => {
                return elem.userProfile.shifts.map((el, i) => {
                  return (
                    <tr key={index + i} id={parseInt(elem.id) + i}>
                      <td>{elem.id}</td>
                      <td>
                        {elem.userProfile.fname} {elem.userProfile.lname}
                      </td>
                      <td>{elem.userProfile.email}</td>
                      <td>{el.title}</td>
                      <td>{moment(parseInt(el.startTime)).format("llll")}</td>
                      <td>{moment(parseInt(el.endTime)).format("llll")}</td>
                    </tr>
                  );
                });
              })}
            </tbody>
          )}
        </table>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const Container = styled.div`
  width: inherit;
`;

export default SendMail;
