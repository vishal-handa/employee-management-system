import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";

const AddEmployeeModal = ({ showModal, setShowModal }) => {
  const [empID, setEmpID] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState();

  const modalRef = useRef();
  // function to set all the states to initial state when any part outside the modal is clicked
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
      setEmpID("");
      setFName("");
      setLName("");
      setEmail("");
      setPhone("");
    }
  };

  //function to set all the states to initial state when escape key is pressed.
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        setEmpID("");
        setFName("");
        setLName("");
        setEmail("");
        setPhone("");
      }
    },
    [setShowModal, showModal]
  );

  // function to send the request to the server with employee data
  const handleSubmit = (ev) => {
    ev.preventDefault();
    fetch("/add-new-employee", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: empID,
        fname: fName,
        lname: lName,
        email: email,
        phoneNumber: phone,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 406) {
          setStatus(406);
        } else if (res.status === 200) {
          setStatus(200);
          setShowModal(false);
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        setStatus(406);
      });
  };
  //event handler for pressing the escape key
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
            <Form onSubmit={(ev) => handleSubmit(ev)}>
              <H1>Add New User</H1>

              <Div>
                <label htmlFor="empID">Employee ID</label>
                <Input
                  className={status === 406 ? "showError" : null}
                  type="text"
                  placeholder="Enter Employee ID"
                  name="empID"
                  maxLength="7"
                  value={empID}
                  onChange={(ev) => setEmpID(ev.target.value)}
                  required
                />
              </Div>

              <Div>
                <label htmlFor="fname">First Name</label>
                <Input
                  type="text"
                  placeholder="Enter First Name"
                  name="fname"
                  value={fName}
                  onChange={(ev) => setFName(ev.target.value)}
                  required
                />
              </Div>

              <Div>
                <label htmlFor="lname">Last Name</label>
                <Input
                  type="text"
                  placeholder="Enter Last Name"
                  name="lname"
                  value={lName}
                  onChange={(ev) => setLName(ev.target.value)}
                  required
                />
              </Div>

              <Div>
                <label htmlFor="email">Email</label>
                <Input
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  required
                />
              </Div>

              <Div>
                <label htmlFor="phone-num">Phone Number</label>
                <Input
                  type="text"
                  placeholder="Enter phone number"
                  name="phone-num"
                  maxLength="10"
                  value={phone}
                  onChange={(ev) => setPhone(ev.target.value)}
                  required
                />
              </Div>
              {status === 406 && (
                <Message>
                  Employee ID already taken. Please insert a new ID
                </Message>
              )}
              <SubmitButton type="submit">Submit</SubmitButton>
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
  width: 200px;
  &.showError {
    border: 2px solid red;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 40px;
  background: #4caf50;
  border: none;
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

export default AddEmployeeModal;
