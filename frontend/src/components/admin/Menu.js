import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GiHumanPyramid } from "react-icons/gi";
import { BiNotepad } from "react-icons/bi";
import { IoIosPeople } from "react-icons/io";
import { RiDashboardFill, RiLogoutCircleRLine } from "react-icons/ri";
import Pattern from "../images/pattern2.jpg";

const Menu = () => {
  return (
    <Wrapper>
      <Container>
        <Link to={"/adminHome"}>
          <div>
            <RiDashboardFill size={23} />
          </div>
        </Link>
        <Link to={"/employee-list"}>
          <div>
            <IoIosPeople size={23} />
          </div>
        </Link>
        <div>
          <BiNotepad size={23} />
        </div>
        <div>
          <RiLogoutCircleRLine size={23} />
        </div>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  svg {
    padding: 17px;
    margin-bottom: 20px;
    color: white;
    &:hover {
      opacity: 80%;
    }
  }
  background-image: url(${Pattern});
  background-position-x: 370px;
  /* background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e); */
`;

const Container = styled.div`
  margin-top: 20%;
`;
export default Menu;
