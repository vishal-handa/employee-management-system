import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import moment from "moment";

const CancelModal = ({ showModal, setShowModal, cancelData }) => {
  const [serverError, setServerError] = useState(false);
  const modalRef = useRef();
  console.log(cancelData);
  // function to set all the states to initial state when any part outside the modal is clicked
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
      setServerError(false);
    }
  };

  //function to set all the states to initial state when escape key is pressed.
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        setServerError(false);
      }
    },
    [setShowModal, showModal]
  );

  //event handler for pressing the escape key
  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  //// function to send the request to the server with cancel shift data
  const handleCancelShift = (ev) => {
    ev.preventDefault();
    fetch("/cancel-user-shift", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cancelData),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          setShowModal(false);
          window.location.reload();
        } else setServerError(true);
      });
  };

  if (serverError) {
    window.alert("Server error. Please try again.");
  }

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <ModalWrapper showModal={showModal}>
            <ModalContent>
              {cancelData && (
                <>
                  <H1>Confirm shift cancellation.</H1>
                  <Form onSubmit={handleCancelShift}>
                    <Label>
                      <b>Start Time:</b>{" "}
                      {moment(new Date(parseInt(cancelData.startTime))).format(
                        "lll"
                      )}
                    </Label>
                    <Label>
                      <b>End Time:</b>{" "}
                      {moment(new Date(parseInt(cancelData.endTime))).format(
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
  background: rgba(0, 0, 0, 0.5);
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
  width: 450px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  padding-top: 20px;
  p {
    margin-bottom: 1rem;
  }
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
  padding: 10px 20px 10px 10px;
  font-size: 1.4em;
  text-align: center;
  width: 100%;
  border-bottom: 1px solid gray;
`;

const Label = styled.label`
  color: black;
  font-size: 1em;
  padding: 10px 10px 0px 10px;
`;

export default CancelModal;
