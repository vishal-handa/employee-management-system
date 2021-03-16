import React, { useState } from "react";
import styled from "styled-components";
import AssignShiftModal from "./AssignShiftsModal";
import Menu from "./Menu";

const UserShifts = () => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <Wrapper>
      <Menu />
      <div>
        <Button onClick={openModal}>Add New Shifts</Button>
      </div>
      <AssignShiftModal showModal={showModal} setShowModal={setShowModal} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const Button = styled.button`
  min-width: 100px;
  padding: 16px 32px;
  border-radius: 4px;
  border: none;
  background: #141414;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
`;

export default UserShifts;
