import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setLogOut } from "../../actions";
import { AiOutlineHome } from "react-icons/ai";
import { BiCalendar, BiNotepad } from "react-icons/bi";
import { IoSwapHorizontal } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import { CgUnavailable } from "react-icons/cg";
import Pattern from "../images/pattern.jpg";

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
          <Link to={"/cancelled-shifts"}>
            <CgUnavailable size={23} />
          </Link>
        </div>
        <div>
          <IoSwapHorizontal size={23} />
        </div>
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
