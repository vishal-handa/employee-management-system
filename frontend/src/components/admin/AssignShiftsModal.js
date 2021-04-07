import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";

const AssignShiftModal = ({ showModal, setShowModal }) => {
  const [startTime, setStartTime] = useState("");
  const [empID, setEmpID] = useState();
  const [endTime, setEndTime] = useState("");
  const [shiftType, setShiftType] = useState("");
  const [timeError, setTimeError] = useState(false);
  const empData = useSelector((state) => state.allShifts.users);
  // console.log(empData);
  const modalRef = useRef();
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (new Date(endTime).getTime() - new Date(startTime).getTime() <= 0) {
      setTimeError(true);
    } else {
      const shiftStart = new Date(startTime).getTime().toString();
      const shiftEnd = new Date(endTime).getTime().toString();

      // console.log(shiftStart, shiftEnd);
      fetch("/assign-shifts", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          empid: empID,
          startTime: shiftStart,
          endTime: shiftEnd,
          title: shiftType,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 200) {
            setShowModal(false);
            setTimeError(false);
            setEmpID("");
            setEndTime("");
            setStartTime("");
            setShiftType("");
            window.location.reload();
          }
        });
    }
  };

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <ModalWrapper showModal={showModal}>
            <ModalContent>
              <Form onSubmit={handleSubmit}>
                <H1>Assign new shift</H1>
                <ErrorMessage
                  className={timeError === true ? "showError" : null}
                >
                  Please set proper time
                </ErrorMessage>
                <Label>Select employee ID:</Label>
                {empData && (
                  <select onChange={(ev) => setEmpID(ev.target.value)} required>
                    <option autoFocus>Select ID</option>
                    {empData.map((elem) => {
                      return (
                        <option key={elem.id} value={elem.id}>
                          {elem.id} - {elem.userProfile.lname},{" "}
                          {elem.userProfile.fname}
                        </option>
                      );
                    })}
                  </select>
                )}
                <Label htmlFor="start-time">Select start time:</Label>
                <Input
                  className={timeError === true ? "showError" : null}
                  type="datetime-local"
                  value={startTime}
                  name="start-time"
                  min="1990-06-07T00:00"
                  max="2099-06-14T00:00"
                  onChange={(ev) => setStartTime(ev.target.value)}
                  required
                />

                <Label htmlFor="end-time">Select end time:</Label>
                <Input
                  className={timeError === true ? "showError" : null}
                  type="datetime-local"
                  value={endTime}
                  name="end-time"
                  min="1990-06-07T00:00"
                  max="2099-06-14T00:00"
                  onChange={(ev) => setEndTime(ev.target.value)}
                  required
                />
                <Label>Select shift type:</Label>
                <select
                  onChange={(ev) => setShiftType(ev.target.value)}
                  required
                >
                  <option>Shift type</option>
                  <option value="Invigilation">Invigilation</option>
                  <option value="Scribe">Scribe</option>
                </select>
                <Button type="submit">Assign Shift</Button>
              </Form>
            </ModalContent>
            <CloseModalButton
              aria-label="Close modal"
              onClick={() => setShowModal((prev) => !prev)}
            />
          </ModalWrapper>
        </Background>
      ) : null}
    </>
  );
};

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  position: relative;
  z-index: 10;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;

  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 28px;
  height: 28px;
  padding: 0;
  z-index: 10;
`;

const Form = styled.form`
  padding: 30px;
  display: flex;
  flex-direction: column;
  width: 400px;
  label {
    font-size: 14px;
    padding-right: 5px;
  }
`;

const Button = styled.button`
  height: 40px;
  background: transparent;
  color: white;
  cursor: pointer;
  padding: 0px 20px 0px 20px;
  margin-top: 20px;
  &:hover {
    background-color: gray;
  }
`;

const H1 = styled.h1`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 1.7em;
  text-align: center;
  border-bottom: 1px solid gray;
`;

const Label = styled.label`
  color: black;
  font-size: 1em;
  padding: 10px 10px 0px 10px;
`;

const Input = styled.input`
  margin: 10px;
  height: 25px;
  display: inline-block;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  box-sizing: border-box;
  text-align: left;
  &.showError {
    border: 2px solid red;
  }
`;

const ErrorMessage = styled.h3`
  margin-bottom: 0rem;
  text-align: center;
  display: none;
  &.showError {
    display: block;
    color: red;
  }
`;

export default AssignShiftModal;
