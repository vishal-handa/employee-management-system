import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Menu from "./Menu";
import CancelModal from "./CancelModal";
import { updateUserShifts } from "../../actions";

const EditShifts = () => {
  const events = Object.values(useSelector((state) => state.user.user.shifts));
  const dispatch = useDispatch();
  const [cancelModal, setCancelModal] = useState(false);
  const [cancelData, setCancelData] = useState();
  const ID = useSelector((state) => state.user.user.id);
  useEffect(() => {
    fetch(`/get-user-shifts/${ID}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          const shifts = res.data;
          dispatch(updateUserShifts(shifts));
        }
      });
  }, []);

  const handleCancellingShifts = (ev, object) => {
    setCancelModal((prev) => !prev);
    setCancelData(object);
  };
  return (
    <Wrapper>
      <Menu />
      <table>
        <thead>
          <tr>
            <th>Shift Title</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Cancel Shift</th>
            <th>Swap Shift</th>
          </tr>
        </thead>
        <tbody>
          {events.map((elem, index) => {
            return (
              <tr key={index}>
                <td>{elem.title}</td>
                <td>
                  {moment(parseInt(elem.startTime)).local().format("LLLL")}
                </td>
                <td>{moment(parseInt(elem.endTime)).local().format("LLLL")}</td>
                <td>
                  <button onClick={(ev) => handleCancellingShifts(ev, elem)}>
                    Cancel
                  </button>
                </td>
                <td>
                  <button>Swap</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <CancelModal
        showModal={cancelModal}
        setShowModal={setCancelModal}
        cancelData={cancelData}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  table {
    border-collapse: collapse;
    width: 100%;
    margin: 10px;
  }

  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
`;

export default EditShifts;
