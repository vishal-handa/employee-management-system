import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";

const UpdateAdminPassword = ({ showModal, setShowModal, profile }) => {
  const modalRef = useRef();
  const [oldPassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [status, setStatus] = useState(0);
  const [error, setError] = useState("");
  // console.log(status);
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
      setError("");
      setStatus(0);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordError(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        setError("");
        setStatus(0);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setPasswordError(false);
      }
    },
    [setShowModal, showModal]
  );

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (confirmPassword !== newpassword) {
      setPasswordError(true);
    } else if (confirmPassword === newpassword) {
      fetch("/update-admin-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: profile.id,
          oldPassword: oldPassword,
          newPassword: newpassword,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
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
    }
  };

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
            <Form onSubmit={handleSubmit}>
              <H1>Update Password</H1>
              {error && <Message>{error}</Message>}
              <Label>
                <b>Old password</b>
              </Label>
              <Input
                className={status === 404 ? "showError" : null}
                type="password"
                value={oldPassword}
                placeholder="Type existing password"
                onChange={(ev) => setOldPassword(ev.target.value)}
                required
              />
              <Label>
                <b>New password:</b>
              </Label>
              <Input
                className={passwordError === true ? "notConfirmed" : null}
                type="password"
                maxLength="10"
                value={newpassword}
                placeholder="Type new password"
                onChange={(ev) => setNewPassword(ev.target.value)}
                required
              />
              <Label>
                <b>Confirm password:</b>
              </Label>
              <Input
                className={passwordError === true ? "notConfirmed" : null}
                type="password"
                value={confirmPassword}
                placeholder="Confirm new password"
                onChange={(ev) => setConfirmPassword(ev.target.value)}
                required
              />
              {passwordError && (
                <Message>Passwords not confirmed. Please try again.</Message>
              )}
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
  &.notConfirmed {
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

const Message = styled.p`
  font-size: 12px;
  padding: 5px;
  color: red;
`;

export default UpdateAdminPassword;
