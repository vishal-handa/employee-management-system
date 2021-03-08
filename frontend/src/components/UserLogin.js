import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import BGImage from "./images/bg.jpg";

const UserLogin = () => {
  const [empID, setEmpID] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
  let bool = false;
  const handleSubmit = (ev) => {
    ev.preventDefault();
    fetch("/userlogin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: empID, password: password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          history.push("/userHome");
        } else if (res.status === 404) {
          bool = true;
          console.log(res.status, bool);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Wrapper>
      <Form onSubmit={(ev) => handleSubmit(ev)}>
        <Label htmlFor="empID">
          <b>Employee ID</b>
        </Label>
        <Input
          type="text"
          placeholder="Employee ID"
          name="empID"
          value={empID}
          onChange={(ev) => setEmpID(ev.target.value)}
          required
        />

        <Label htmlFor="psw">
          <b>Password</b>
        </Label>
        <Input
          type="password"
          placeholder="Enter Password"
          name="psw"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          required
        />
        <Button type="submit">Login</Button>
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
  font-size: 1em;
  padding: 10px 10px 0px 10px;
`;

const Input = styled.input`
  margin: 10px;
  height: 40px;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
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

export default UserLogin;
