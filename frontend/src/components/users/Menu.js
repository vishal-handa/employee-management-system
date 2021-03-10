import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineHome } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import { GrWorkshop } from "react-icons/gr";
import { IoSwapHorizontal } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import { CgUnavailable } from "react-icons/cg";

const Menu = () => {
  return (
    <Wrapper>
      <Container>
        <div>
          <AiOutlineHome size={23} />
        </div>
        <div>
          <BiCalendar size={23} />
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
      cursor: pointer;
      opacity: 80%;
    }
  }
  background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
`;

const Container = styled.div`
  margin-top: 20%;
`;
export default Menu;
