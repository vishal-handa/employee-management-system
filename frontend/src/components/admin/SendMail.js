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
    let shiftFilter = empShifts
      .map((elem) => {
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
      })
      .filter((elem) => elem.userProfile.shifts.length > 0);

    // console.log(shiftFilter);
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
  // console.log(filteredShifts);
  const handleEmailFunction = () => {
    console.log(filteredShifts);
    fetch("/send-emails", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filteredShifts),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          window.alert("Emails sent!");
        } else if (res.status === 502) {
          window.alert(
            "Email not sent to " + res.message + ". Please try again."
          );
        } else {
          window.alert("Server error. Please try again.");
        }
      });
  };

  return (
    <Wrapper>
      <Menu />
      <Container>
        <Banner>Notify invigilators</Banner>
        <P>-Select date range and send emails-</P>
        <InputContainer>
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
        </InputContainer>
        <InputContainer>
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
        </InputContainer>
        <ButtonContainer>
          <button onClick={handleShiftFilter}>Get appropriate shifts</button>
          <button onClick={handleEmailFunction}>Send Emails</button>
        </ButtonContainer>
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

const Banner = styled.p`
  width: 100%;
  color: black;
  padding: 50px 0px 50px 10px;
  font-size: 3em;
  font-weight: 900;
`;

const P = styled.p`
  font-size: 2em;
  text-align: center;
`;

const InputContainer = styled.div`
  text-align: center;
  padding: 20px;
  input {
    width: 200px;
  }
`;

const ButtonContainer = styled.div`
  text-align: center;
  button {
    margin: 20px;
    padding: 10px;
    cursor: pointer;
    background-color: black;
    color: white;
    &:hover {
      background-color: gray;
    }
  }
`;

export default SendMail;
