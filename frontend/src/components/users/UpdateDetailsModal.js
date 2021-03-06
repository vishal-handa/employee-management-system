import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";

const UpdateDetailsModal = ({ showModal, setShowModal, profile }) => {
  const modalRef = useRef();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(0);
  const [error, setError] = useState("");

  // function to set all the states to initial state when any part outside the modal is clicked
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
      setPhone("");
      setPassword("");
      setError("");
      setStatus(0);
    }
  };

  //function to set all the states to initial state when escape key is pressed.
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        setPhone("");
        setPassword("");
        setError("");
        setStatus(0);
      }
    },
    [setShowModal, showModal]
  );

  //event handler for pressing the escape key
  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  // function to send the request to the server to update phone number.
  const handleSubmit = (ev) => {
    ev.preventDefault();
    fetch("/update-contact-info", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: profile._id,
        password: password,
        phoneNumber: phone,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          setShowModal(false);
          setStatus(200);
          window.location.reload();
        } else if (res.status === 404) {
          setStatus(404);
          setError(res.message);
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
            <ModalContent></ModalContent>
            <CloseModalButton
              aria-label="Close modal"
              onClick={() => setShowModal((prev) => !prev)}
            />
            <Form onSubmit={handleSubmit}>
              <H1>Update Phone Number</H1>
              <Label>
                <b>Phone number:</b>
              </Label>
              <Input
                type="text"
                maxLength="10"
                value={phone}
                placeholder={profile.phoneNumber}
                onChange={(ev) => setPhone(ev.target.value)}
                required
              />
              <Label>
                <b>Password:</b>
              </Label>
              <Input
                className={status === 404 ? "showError" : null}
                type="password"
                value={password}
                placeholder="Confirm password"
                onChange={(ev) => setPassword(ev.target.value)}
                required
              />
              {error && <Message>{error}</Message>}
              <Button type="submit">Update</Button>
            </Form>
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
  label {
    font-size: 14px;
    padding-right: 5px;
  }
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
  width: 70%;
  &.showError {
    border: 2px solid red;
  }
`;

const Label = styled.label`
  color: black;
  font-size: 1em;
  padding: 10px 10px 0px 10px;
  font-style: bolder;
`;

const Button = styled.button`
  height: 40px;
  background-color: #1798d1;
  border: none;
  color: #fff;
  cursor: pointer;
  letter-spacing: 0.05em;
  outline: none;
  margin-top: 20px;
  &:hover {
    background-color: #0a63b0;
    color: white;
  }
`;

const Message = styled.p`
  font-size: 12px;
  padding: 5px;
  color: red;
`;

export default UpdateDetailsModal;
