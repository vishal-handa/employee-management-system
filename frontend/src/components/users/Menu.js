import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setLogOut } from "../../actions";
import { AiOutlineHome } from "react-icons/ai";
import { BiCalendar, BiNotepad, BiUserCircle } from "react-icons/bi";
import { RiLogoutCircleLine } from "react-icons/ri";
import { CgUnavailable } from "react-icons/cg";
import Pattern from "../images/pattern.jpg";
import ReactTooltip from "react-tooltip";

const Menu = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setLogOut());
    window.localStorage.clear();
    history.push("/");
  };
  return (
    <Wrapper>
      <Container>
        <div data-tip data-for="home">
          <Link to={"/userHome"}>
            <AiOutlineHome size={23} />
          </Link>
          <Tooltip place="right" type="dark" effect="solid" id="home">
            {" Home"}
          </Tooltip>
        </div>
        <div data-tip data-for="calendar">
          <Link to={"/user-shifts"}>
            <BiCalendar size={23} />
          </Link>
          <Tooltip place="right" type="dark" effect="solid" id="calendar">
            {" Calendar and Agenda"}
          </Tooltip>
        </div>
        <div data-tip data-for="shifts">
          <Link to={"/edit-shifts"}>
            <BiNotepad size={23} />
          </Link>
          <Tooltip place="right" type="dark" effect="solid" id="shifts">
            {" View Shifts"}
          </Tooltip>
        </div>
        <div data-tip data-for="cancelled">
          <Link to={"/cancelled-shifts"}>
            <CgUnavailable size={23} />
          </Link>
          <Tooltip place="right" type="dark" effect="solid" id="cancelled">
            {" See Cancelled Shifts"}
          </Tooltip>
        </div>
        <div data-tip data-for="profile">
          <Link to={"/user-profile"}>
            <BiUserCircle size={23} />
          </Link>
          <Tooltip place="right" type="dark" effect="solid" id="profile">
            {" User Profile"}
          </Tooltip>
        </div>
        <div data-tip data-for="logout">
          <Button onClick={handleLogout}>
            <RiLogoutCircleLine size={23} />
          </Button>
          <Tooltip place="right" type="dark" effect="solid" id="logout">
            {" Logout"}
          </Tooltip>
        </div>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: sticky;
  top: 0;
  z-index: 1500;
  svg {
    padding: 30px 17px 30px 17px;
    color: white;
    &:hover {
      opacity: 80%;
    }
    &:focus {
      background-color: #7c7a7a;
    }
  }
  background-image: url(${Pattern});
  background-position-x: 370px;
`;

const Container = styled.div`
  margin-top: 20%;
`;

const Button = styled.button`
  background: none;
  outline: none;
  cursor: pointer;
  padding: 0;
`;

const Tooltip = styled(ReactTooltip)`
  z-index: 500;
  background-color: #f9f83d;
  border: 0.5px solid black;
  color: black;
`;
export default Menu;
