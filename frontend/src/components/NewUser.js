import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import BGImage from "./images/bg.jpg";

const NewUser = () => {
  const [empID, setEmpID] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState();

  let history = useHistory();

  const handleRegister = (ev) => {
    ev.preventDefault();
    fetch("/register-user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: empID,
        password: password,
        fname: fName,
        lname: lName,
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 406) {
          setStatus(406);
        } else if (res.status === 200) {
          setStatus(200);
          history.push("/");
        }
      });
  };

  return (
    <Wrapper>
      <Form onSubmit={handleRegister}>
        {status === 406 && (
          <Message>
            Employee details don't exist in the system. Please contact the
            administrator.
          </Message>
        )}
        <Label htmlFor="empID">
          <b>Employee ID</b>
        </Label>
        <Input
          className={status === 406 ? "showError" : null}
          type="text"
          placeholder="Employee ID"
          name="empID"
          maxLength="7"
          value={empID}
          onChange={(ev) => setEmpID(ev.target.value)}
          required
        />
        <Label htmlFor="fname">
          <b>First Name</b>
        </Label>
        <Input
          className={status === 406 ? "showError" : null}
          type="text"
          placeholder="Enter First Name"
          name="fname"
          value={fName}
          onChange={(ev) => setFName(ev.target.value)}
          required
        />
        <Label htmlFor="lname">
          <b>Last Name</b>
        </Label>
        <Input
          className={status === 406 ? "showError" : null}
          type="text"
          placeholder="Enter Last Name"
          name="lname"
          value={lName}
          onChange={(ev) => setLName(ev.target.value)}
          required
        />

        <Label htmlFor="email">
          <b>Email</b>
        </Label>
        <Input
          className={status === 406 ? "showError" : null}
          type="email"
          placeholder="Enter email"
          name="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          required
        />
        <Label htmlFor="psw">
          <b>Password</b>
        </Label>
        <Input
          className={status === 406 ? "showError" : null}
          type="password"
          placeholder="Enter Password"
          name="psw"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          required
        />

        <Button type="submit">Register</Button>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: inherit;
  width: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: url(${BGImage});
  background-repeat: no-repeat;
  background-size: cover;
`;

const Form = styled.form`
  margin-left: 13%;
  display: flex;
  flex-direction: column;
  width: 400px;
  box-shadow: 0px 0px 3px 0px rgba(50, 50, 50, 0.75);
  background: white;
  border-radius: 10px;
  padding: 10px;
`;

const Label = styled.label`
  color: black;
  font-size: 0.9em;
  padding: 10px 10px 0px 10px;
`;

const Input = styled.input`
  margin: 10px;
  height: 30px;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  &.showError {
    border: 2px solid red;
  }
`;

const Button = styled.button`
  background: linear-gradient(to right, #a2ccb6 0%, #fceeb5 50%, #ee786e 100%);
  background-size: 500%;
  border: none;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  height: 40px;
  letter-spacing: 0.05em;
  outline: none;
  margin: 10px;
`;

const Message = styled.p`
  font-size: 14px;
  padding: 5px;
  color: red;
  padding: 1px;
  text-align: center;
`;

export default NewUser;
