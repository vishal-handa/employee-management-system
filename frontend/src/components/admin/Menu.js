import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { setLogOut } from "../../actions";
import { useDispatch } from "react-redux";
import { BiNotepad, BiMailSend, BiUserCircle } from "react-icons/bi";
import { IoIosPeople } from "react-icons/io";
import { RiDashboardFill, RiLogoutCircleLine } from "react-icons/ri";
import Pattern from "../images/pattern2.jpg";
import ReactTooltip from "react-tooltip";

const Menu = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setLogOut());
    window.localStorage.clear();
    history.push("/admin");
  };
  return (
    <Wrapper>
      <Container>
        <Link to={"/adminHome"} data-tip data-for="home">
          <div>
            <RiDashboardFill size={23} />
          </div>
          <ReactTooltip place="right" type="dark" effect="solid" id="home">
            {" Home"}
          </ReactTooltip>
        </Link>
        <Link to={"/employee-list"} data-tip data-for="allEmps">
          <div>
            <IoIosPeople size={23} />
          </div>
          <ReactTooltip place="right" type="dark" effect="solid" id="allEmps">
            {" Employees"}
          </ReactTooltip>
        </Link>
        <Link to={"/see-all-shifts"} data-tip data-for="allShifts">
          <div>
            <BiNotepad size={23} />
          </div>
          <ReactTooltip place="right" type="dark" effect="solid" id="allShifts">
            {" Employee Shifts"}
          </ReactTooltip>
        </Link>
        <Link to={"/mail-shifts"} data-tip data-for="emails">
          <div>
            <BiMailSend size={23} />
          </div>
          <ReactTooltip place="right" type="dark" effect="solid" id="emails">
            {" Send Emails"}
          </ReactTooltip>
        </Link>
        <Link data-tip data-for="profile">
          <div>
            <BiUserCircle size={23} />
          </div>
          <ReactTooltip place="right" type="dark" effect="solid" id="profile">
            {" Profile"}
          </ReactTooltip>
        </Link>
        <div data-tip data-for="logout">
          <Button onClick={handleLogout}>
            <RiLogoutCircleLine size={23} />
          </Button>
        </div>
        <ReactTooltip place="right" type="dark" effect="solid" id="logout">
          {" Logout"}
        </ReactTooltip>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  top: 0;
  position: sticky;
  svg {
    padding: 30px 17px 30px 17px;

    color: white;
    &:hover {
      opacity: 80%;
    }
  }
  background-image: url(${Pattern});
  background-position-x: 60px;
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

export default Menu;
