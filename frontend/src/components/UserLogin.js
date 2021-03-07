import React from "react";
import styled from "styled-components";

const UserLogin = () => {
  return (
    <Wrapper>
      <Form>
        <Label htmlFor="empID">
          <b>Employee ID</b>
        </Label>
        <Input type="text" placeholder="Employee ID" name="empID" required />

        <Label htmlFor="psw">
          <b>Password</b>
        </Label>
        <Input
          type="password"
          placeholder="Enter Password"
          name="psw"
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
