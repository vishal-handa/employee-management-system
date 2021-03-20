import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import AssignShiftModal from "./AssignShiftsModal";
import Menu from "./Menu";
import { receieveAllShifts } from "../../actions";
import moment from "moment";
import UpdateShiftModal from "./UpdateShiftModal";
import CancelShiftModal from "./CancelShiftModal";
import DeleteShiftModal from "./DeleteShiftModal";
import { GiConsoleController } from "react-icons/gi";

const UserShifts = () => {
  const [showModal, setShowModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [deteleModal, setDeleteModal] = useState(false);
  const [updateData, setUpdateData] = useState();
  const [cancelData, setCancelData] = useState();
  const [deleteData, setDeleteData] = useState();
  const dispatch = useDispatch();

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const usersAndShifts = useSelector((state) => state.allShifts.users);

  useEffect(() => {
    fetch("/get-all-shifts")
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          dispatch(receieveAllShifts(res.data));
        }
      });
  }, []);

  const handleUpdate = (ev, theUser, theShift) => {
    setUpdateModal((prev) => !prev);
    setUpdateData({
      id: theUser.id,
      fname: theUser.userProfile.fname,
      lname: theUser.userProfile.lname,
      shiftToUpdate: theShift,
    });
  };

  const handleCancel = (ev, theshift) => {
    setCancelModal((prev) => !prev);
  };

  const handleDelete = (ev, theshift) => {
    setDeleteModal((prev) => !prev);
  };

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
              <th></th>
            </tr>
          </thead>
          {usersAndShifts && (
            <tbody>
              {usersAndShifts.map((elem, index) => {
                return elem.userProfile.shifts.map((el, i) => {
                  return (
                    <tr key={index + i} id={parseInt(elem.id) + i}>
                      <td>{elem.id}</td>
                      <td>
                        {elem.userProfile.fname} {elem.userProfile.lname}
                      </td>
                      <td>{el.title}</td>
                      <td>{moment(parseInt(el.startTime)).format("llll")}</td>
                      <td>{moment(parseInt(el.endTime)).format("llll")}</td>
                      <td>
                        <Update onClick={(ev) => handleUpdate(ev, elem, el)}>
                          Update
                        </Update>
                      </td>
                      <td>
                        <Cancel onClick={(ev) => handleCancel(ev, el)}>
                          Cancel
                        </Cancel>
                      </td>
                      <td>
                        <Delete onClick={(ev) => handleDelete(ev, el)}>
                          Delete
                        </Delete>
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
      <UpdateShiftModal
        showModal={updateModal}
        setShowModal={setUpdateModal}
        updateData={updateData}
      />
      <CancelShiftModal showModal={cancelModal} setShowModal={setCancelModal} />
      <DeleteShiftModal showModal={deteleModal} setShowModal={setDeleteModal} />
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

const Update = styled.button`
  /* display: block;
  &.hideUpdate {
    display: none;
  } */
`;

const ConfrimUpdate = styled.button`
  /* display: none;
  &.updateTime {
    display: block;
  } */
`;

const Cancel = styled.button`
  /* display: none;
  &.updateTime {
    display: block;
  } */
`;

const Delete = styled.button`
  /* display: block;
  &.hideUpdate {
    display: none;
  } */
`;

export default UserShifts;
