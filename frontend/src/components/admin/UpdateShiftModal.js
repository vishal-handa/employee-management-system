import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import moment from "moment";

const UpdateShiftModal = ({ showModal, setShowModal, updateData }) => {
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [timeError, setTimeError] = useState(false);
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

  const handleUpdate = (ev) => {
    ev.preventDefault();
    if (new Date(endTime).getTime() - new Date(startTime).getTime() <= 0) {
      setTimeError(true);
    } else {
      const shiftStart = new Date(startTime).getTime().toString();
      const shiftEnd = new Date(endTime).getTime().toString();

      //   console.log(updateData);

      fetch("/update-user-shift", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: updateData.id,
          newshift: {
            id: updateData.shiftToUpdate._id,
            startTime: shiftStart,
            endTime: shiftEnd,
          },
        }),
      })
        .then((res) => res.json())
        .then((res) => console.log(res));
    }
  };

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <ModalWrapper showModal={showModal}>
            <ModalContent>
              <H1>Update existing shift</H1>
              <Notice>
                Please note that you will be able to update only date and times.
                If you want to update the invigilator name, please delete this
                shift and assign new shift by clicking on{" "}
                <i>"Add New Shifts"</i> button.{" "}
              </Notice>
              <Form onSubmit={handleUpdate}>
                {updateData && (
                  <>
                    <Label>
                      <b>Employee ID:</b> {updateData.id}
                    </Label>
                    <Label>
                      <b>Name: </b>
                      {updateData.fname} {updateData.lname}
                    </Label>
                    <Label>
                      <b>Current start time: </b>
                      {moment(
                        new Date(parseInt(updateData.shiftToUpdate.startTime))
                      ).format("lll")}
                    </Label>
                    <Label>
                      <b>Current end time: </b>
                      {moment(
                        parseInt(updateData.shiftToUpdate.endTime)
                      ).format("lll")}
                    </Label>
                  </>
                )}
                <Label>
                  <b>New Start Time:</b>
                </Label>
                <Input
                  //   className={timeError === true ? "showError" : null}
                  type="datetime-local"
                  value={startTime}
                  name="start-time"
                  min="1990-06-07T00:00"
                  max="2099-06-14T00:00"
                  onChange={(ev) => setStartTime(ev.target.value)}
                  required
                />
                <Label>
                  <b> New End Time:</b>
                </Label>
                <Input
                  //   className={timeError === true ? "showError" : null}
                  type="datetime-local"
                  value={endTime}
                  name="start-time"
                  min="1990-06-07T00:00"
                  max="2099-06-14T00:00"
                  onChange={(ev) => setEndTime(ev.target.value)}
                  required
                />
                <Button type="submit">Update</Button>
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
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  width: 500px;
  background: #fff;
  color: #000;
  position: relative;
  z-index: 10;
  border-radius: 10px;
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

const Notice = styled.p`
  font-size: 12px;
  padding: 10px 20px 10px 20px;
  margin: 0;
  border-bottom: 1px solid gray;
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
  padding: 0px 30px 30px 30px;
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
  background: #4caf50;
  border: none;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  letter-spacing: 0.05em;
  outline: none;
  margin-top: 20px;
  &:hover {
    background: white;
    color: black;
    border: 2px solid black;
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

export default UpdateShiftModal;
