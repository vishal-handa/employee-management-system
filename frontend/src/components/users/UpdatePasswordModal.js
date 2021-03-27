import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";

const UpdatePasswordModal = ({ showModal, setShowModal }) => {
  const modalRef = useRef();
  // console.log(status);
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
  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <ModalWrapper showModal={showModal}>
            <ModalContent></ModalContent>
            <CloseModalButton
              aria-label="Close modal"
              onClick={() => setShowModal((prev) => !prev)}
            />
            <Form>{"update this shite"}</Form>
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
  padding: 30px;
  label {
    font-size: 14px;
    padding-right: 5px;
  }
`;

const Div = styled.div`
  text-align-last: end;
  margin: 10px;
`;

const H1 = styled.h1`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 1.7em;
  text-align: center;
  border-bottom: 1px solid gray;
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

const SubmitButton = styled.button`
  width: 100%;
  height: 40px;
  background: #4caf50;
  border: none;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  letter-spacing: 0.05em;
  outline: none;
  &:hover {
    background: white;
    color: black;
    border: 2px solid #4caf50;
  }
`;

const Message = styled.p`
  font-size: 12px;
  padding: 5px;
  color: red;
`;

export default UpdatePasswordModal;
