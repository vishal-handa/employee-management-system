import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Menu from "./Menu";
import { useSelector, useDispatch } from "react-redux";
import { receieveAllShifts, receieveEmployeeList } from "../../actions";
import emp from "../images/admin.jpg";

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
      <Container>
        <Section>
          <div>
            <Img src={emp} />
          </div>
          <div>
            <H1>
              <strong>{`Hi, ${adminState.fname} ${adminState.lname}!`}</strong>
            </H1>
            <P>Welcome to your personal admin portal.</P>
          </div>
        </Section>
        <Statement>Here you can..</Statement>
        <Grid>
          <GridElement style={{ backgroundColor: "#E64F5E" }}>
            <div>
              <h1>VIEW ALL EMPLOYEES</h1>
              <p>
                Clicking on all "Employees" icon shows you all the employees in
                the syste. You can also filter the employees by active, retired
                or archived employees.
              </p>
            </div>
          </GridElement>
          <GridElement style={{ backgroundColor: "#34C0A5" }}>
            <div>
              <h1>ADD NEW EMPLOYEE</h1>
              <p>
                Administrators can add a new employee to the list by putting in
                their personal information. Only after this step, a new employee
                can register.
              </p>
            </div>
          </GridElement>
          <GridElement style={{ backgroundColor: "#4A87DA" }}>
            <div>
              <h1>ASSIGN AND VIEW SHIFTS</h1>
              <p>
                You can assign a shift to a particular employee, and filter and
                view all shifts for all employees on the "Employee shifts" page.
              </p>
            </div>
          </GridElement>
          <GridElement style={{ backgroundColor: "#EF8839" }}>
            <div>
              <h1>CHANGE EMPLOYEE STATUS</h1>
              <p>
                Have an employee that is leaving? You can change their
                employement status to "Retired", or to "Archived" if their
                retired status is more than 3 years!
              </p>
            </div>
          </GridElement>
          <GridElement style={{ backgroundColor: "#6A78DF" }}>
            <div>
              <h1> SEND EMAILS</h1>
              <p>
                Clicking on "Send Email" icon can help you filter out shifts in
                upcoming date range, and you can send out mass emails to your
                employees!
              </p>
            </div>
          </GridElement>
          <GridElement style={{ backgroundColor: "#63AA30" }}>
            <div>
              <h1> TAKE CANCELLED SHIFTS</h1>
              <p>
                Clicking on the "Cancelled Shifts" menu will take you to the
                page where you can see all the shifts that are cancelled by your
                employees.
              </p>
            </div>
          </GridElement>
        </Grid>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  z-index: 100;
`;

const Container = styled.div`
  width: inherit;
`;

const Img = styled.img`
  border-radius: 50%;
  border: 10px solid #d2302d;
`;

const Section = styled.section`
  display: flex;
  padding: 5px;
`;

const H1 = styled.h1`
  font-size: 4em;
  padding: 30px;
  color: black;
`;

const P = styled.p`
  padding: 0px 30px 30px 30px;
  color: gray;
`;

const Grid = styled.section`
  display: grid;
  grid-template-columns: auto auto auto;
  margin: 20px 7% 0% 7%;
  align-items: center;
  justify-items: center;
  overflow-x: hidden;
`;

const GridElement = styled.div`
  padding: 10px;
  max-width: 300px;
  margin: 30px;
  color: white;
  div {
    padding: 15px;
  }
  h1 {
    line-height: 3;
  }
  p {
    font-size: 14px;
    line-height: 1.5;
  }
`;

const Statement = styled.h1`
  text-align: center;
  font-size: 3em;
`;

export default AdminHome;
