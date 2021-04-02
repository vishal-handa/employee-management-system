import React from "react";
import styled from "styled-components";
import Menu from "./Menu";
import { useSelector } from "react-redux";
import bg from "../images/home-page-background.jpg";
import emp from "../images/employee.png";

const UserHome = () => {
  const userState = useSelector((state) => state.user.user);
  return (
    <Wrapper>
      <Menu />
      <Container>
        <Section>
          <div>
            <img src={emp} />
          </div>
          <div>
            <H1>
              <strong>{`Hi! ${userState.fname} ${userState.lname}!`}</strong>
            </H1>
            <P>Welcome to your personal employee portal.</P>
          </div>
        </Section>
        <Statement>Here you can..</Statement>
        <Grid>
          <GridElement style={{ backgroundColor: "#E64F5E" }}>
            <div>
              <h1>VIEW THE CALENDAR</h1>
              <p>
                Click on the "Calendar" icon in the menu and see all of your
                shifts in the organised layout. You can see all shifts in the
                month view, week view, day view and in an agenda view.
              </p>
            </div>
          </GridElement>
          <GridElement style={{ backgroundColor: "#34C0A5" }}>
            <div>
              <h1>EDIT YOUR SHIFTS</h1>
              <p>
                Click on the "List" icon to see your upcoming, past and all
                shifts in the tabular format. You also have the put your shifts
                for cancellation and swapping.
              </p>
            </div>
          </GridElement>
          <GridElement style={{ backgroundColor: "#4A87DA" }}>
            <div>
              <h1>TAKE CANCELLED SHIFTS</h1>
              <p>
                Clicking on the "Cancelled Shifts" menu will take you to the
                page where you can see shifts cancelled by your peers. You can
                take if your schedule allows it.
              </p>
            </div>
          </GridElement>
          <GridElement style={{ backgroundColor: "#EF8839" }}>
            <div>
              <h1> UPDATE YOUR CONTACTS</h1>
              <p>
                Want to update the way we can contact you? Click on the
                "Profile" icon to see your most updated employee information,
                and update it if you want!
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
  grid-template-columns: auto auto;
  margin: 20px 10% 0% 10%;
  align-items: center;
  justify-items: center;
`;

const GridElement = styled.div`
  padding: 10px;
  width: 300px;
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

export default UserHome;
