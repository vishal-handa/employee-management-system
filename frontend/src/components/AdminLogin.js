import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import BGImage from "./images/bg.jpg";
import { setLogIn, receiveAdminProfile } from "../actions";

const AdminLogin = () => {
  const [adminName, setAdminName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  let history = useHistory();
  const dispatch = useDispatch();
  const handleSubmit = (ev) => {
    ev.preventDefault();
    fetch("/adminlogin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName: adminName, password: password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          dispatch(setLogIn());
          dispatch(receiveAdminProfile(res.data));
          history.push("/adminHome");
        } else if (res.status === 404) {
          setError(true);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Wrapper>
      <Form onSubmit={(ev) => handleSubmit(ev)}>
        {error === true ? (
          <P>Login error. Please fill in correct details. </P>
        ) : null}
        <Label htmlFor="admin">
          <b>Admin Name</b>
        </Label>
        <Input
          className={error === true ? "showError" : null}
          type="text"
          placeholder="Admin Name"
          name="admin"
          value={adminName}
          onChange={(ev) => setAdminName(ev.target.value)}
          required
        />

        <Label htmlFor="psw">
          <b>Password</b>
        </Label>
        <Input
          className={error === true ? "showError" : null}
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

const P = styled.p`
  color: red;
  text-align: center;
  font-size: 14px;
`;

export default AdminLogin;
