import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Menu from "./Menu";
import CancelModal from "./CancelModal";
import { updateUserShifts } from "../../actions";

const EditShifts = () => {
  const [events, setEvents] = useState([]);
  const shifts = useSelector((state) => state.user.user.shifts);
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

  const sortFutureShifts = shifts.filter((elem) => {
    if (new Date(parseInt(elem.startTime)) > Date.now()) {
      return elem;
    }
  });

  const sortOldShifts = shifts.filter((elem) => {
    if (new Date(parseInt(elem.startTime)) < Date.now()) {
      return elem;
    }
  });

  const sortAllShifts = Object.values(
    useSelector((state) => state.user.user.shifts)
  );

  const UpcomingShifts = () => {
    return setEvents(sortFutureShifts);
  };

  const PastShifts = () => {
    return setEvents(sortOldShifts);
  };

  const AllShifts = () => {
    return setEvents(sortAllShifts);
  };

  return (
    <Wrapper>
      <Menu />
      <Container>
        <Banner>View and Edit Shifts</Banner>
        <ButtonContainer>
          <Button onClick={UpcomingShifts}>Upcoming shifts</Button>
          <Button onClick={PastShifts}>Past Shifts</Button>
          <Button onClick={AllShifts}>All shifts</Button>
        </ButtonContainer>
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
                  <td>
                    {moment(parseInt(elem.endTime)).local().format("LLLL")}
                  </td>
                  <td>
                    <button
                      onClick={(ev) => handleCancellingShifts(ev, elem)}
                      disabled={
                        new Date(parseInt(elem.startTime)) < Date.now()
                          ? true
                          : false
                      }
                    >
                      Cancel
                    </button>
                  </td>
                  <td>
                    <button
                      disabled={
                        new Date(parseInt(elem.startTime)) < Date.now()
                          ? true
                          : false
                      }
                    >
                      Swap
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Container>
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
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: inherit;
  table {
    th {
      background-color: #4b4b4b;
      color: white;
    }
  }
`;

const Banner = styled.p`
  width: 100%;
  color: #e64f5e;
  padding: 50px 0px 50px 10px;
  font-size: 3em;
  font-weight: 900;
`;

const ButtonContainer = styled.div`
  width: inherit;
  padding-bottom: 20px;
`;

const Button = styled.button`
  width: 33.33%;
  height: 40px;
  background-color: transparent;
  transition: 0.3s;
  cursor: pointer;
  font-size: 15px;
  background-color: #e64f5e;
  color: white;
  &:hover {
    text-decoration: underline;
  }
`;

export default EditShifts;
