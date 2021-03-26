import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { setLogOut } from "../../actions";
import { useDispatch } from "react-redux";
import { BiNotepad } from "react-icons/bi";
import { IoIosPeople } from "react-icons/io";
import { RiDashboardFill, RiLogoutCircleLine } from "react-icons/ri";
import Pattern from "../images/pattern2.jpg";

const Menu = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setLogOut());
    history.push("/admin");
  };
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
        <Link to={"/see-all-shifts"}>
          <div>
            <BiNotepad size={23} />
          </div>
        </Link>
        <div>
          <Button onClick={handleLogout}>
            <RiLogoutCircleLine size={23} />
          </Button>
        </div>
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
    padding: 17px;
    margin-bottom: 20px;
    color: white;
    &:hover {
      opacity: 80%;
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

export default Menu;
