import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import moment from "moment";

const DeleteShiftModal = ({ showModal, setShowModal, deleteData }) => {
  const [serverError, setServerError] = useState(false);
  const modalRef = useRef();

  // function to set all the states to initial state when any part outside the modal is clicked
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
      setServerError(true);
    }
  };

  //function to set all the states to initial state when escape key is pressed.
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        setServerError(true);
      }
    },
    [setShowModal, showModal]
  );

  //event handler for pressing the escape key
  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  // function to send the request to the server with delete shift data
  const handleDeleteShift = (ev) => {
    ev.preventDefault();
    fetch("/delete-user-shift", {
      method: "Delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deleteData),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          setShowModal(false);
          window.location.reload();
        } else {
          window.alert("Server error. Please try again.");
        }
      });
  };

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <ModalWrapper showModal={showModal}>
            <ModalContent>
              {" "}
              {deleteData && (
                <>
                  <H1>Are you sure you want to delete following shift?</H1>
                  <Form onSubmit={handleDeleteShift}>
                    <Label>
                      <b>Start Time:</b>{" "}
                      {moment(new Date(parseInt(deleteData.startTime))).format(
                        "lll"
                      )}
                    </Label>
                    <Label>
                      <b>End Time:</b>{" "}
                      {moment(new Date(parseInt(deleteData.endTime))).format(
                        "lll"
                      )}
                    </Label>
                    <Button type="submit">Confirm</Button>
                  </Form>
                </>
              )}
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
  width: 400px;
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
  width: 300px;
  label {
    font-size: 14px;
    padding-right: 5px;
  }
`;

const Button = styled.button`
  height: 40px;
  background: black;
  border: none;
  color: #fff;
  cursor: pointer;
  outline: none;
  margin-top: 20px;
  &:hover {
    background: gray;
  }
`;

const H1 = styled.h1`
  margin-bottom: 10px;
  padding: 20px;
  font-size: 1.7em;
  text-align: center;
  border-bottom: 1px solid gray;
`;

const Label = styled.label`
  color: black;
  font-size: 1em;
  padding: 10px 10px 0px 10px;
`;

export default DeleteShiftModal;
