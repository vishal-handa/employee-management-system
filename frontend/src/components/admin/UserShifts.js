import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import AssignShiftModal from "./AssignShiftsModal";
import Menu from "./Menu";
import { receieveAllShifts } from "../../actions";
import moment from "moment";

const UserShifts = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const openModal = () => {
    setShowModal((prev) => !prev);
  };
  const usersAndShifts = useSelector((state) => state.allShifts.users);
  console.log(usersAndShifts);

  useEffect(() => {
    fetch("/get-all-shifts")
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          dispatch(receieveAllShifts(res.data));
        }
      });
  }, []);

  return (
    <Wrapper>
      <Menu />
      <Container>
        <Button onClick={openModal}>Add New Shifts</Button>
        <h1>Following are the assigned shifts </h1>
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Shift Title</th>
              <th>Shift Start</th>
              <th>Shift End </th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          {usersAndShifts && (
            <tbody>
              {usersAndShifts.map((elem, index) => {
                return elem.userProfile.shifts.map((el, i) => {
                  return (
                    <tr>
                      <td key={index + i}>{elem.id}</td>
                      <td>
                        {elem.userProfile.fname} {elem.userProfile.lname}
                      </td>
                      <td>{el.title}</td>
                      <td>{moment(parseInt(el.startTime)).format("llll")}</td>
                      <td>{moment(parseInt(el.endTime)).format("llll")}</td>
                      <td>
                        <button>Update</button>
                      </td>
                      <td>
                        <button>Delete</button>
                      </td>
                    </tr>
                  );
                });
              })}
            </tbody>
          )}
        </table>
      </Container>

      <AssignShiftModal showModal={showModal} setShowModal={setShowModal} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
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

const Container = styled.div`
  width: inherit;
`;

export default UserShifts;
