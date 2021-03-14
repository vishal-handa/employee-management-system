import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineHome } from "react-icons/ai";
import { BiCalendar, BiNotepad } from "react-icons/bi";
import { GrWorkshop } from "react-icons/gr";
import { IoSwapHorizontal } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import { CgUnavailable } from "react-icons/cg";
import Pattern from "../images/pattern.jpg";

const Menu = () => {
  return (
    <Wrapper>
      <Container>
        <div>
          <Link to={"/userHome"}>
            <AiOutlineHome size={23} />
          </Link>
        </div>
        <div>
          <Link to={"/user-shifts"}>
            <BiCalendar size={23} />
          </Link>
        </div>
        <div>
          <Link to={"/edit-shifts"}>
            <BiNotepad size={23} />
          </Link>
        </div>
        <div>
          <CgUnavailable size={23} />
        </div>
        <div>
          <IoSwapHorizontal size={23} />
        </div>
        <div>
          <RiLogoutCircleLine size={23} />
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
