import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { receieveEmployeeList } from "../../actions";
import Menu from "./Menu";
import AddEmployeeModal from "./AddEmployeeModal";

const EmployeeList = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("/employee-list")
      .then((res) => res.json())
      .then((res) => dispatch(receieveEmployeeList(res.data)));
  }, []);
  const list = useSelector((state) => state.allEmployees.employees);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <Wrapper>
      <Menu />
      <div>
        <Button onClick={openModal}>Add New User</Button>
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Date of Joining (dd/mm/yyyy)</th>
              <th>Employement Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map((elem, index) => {
              return (
                <tr key={index}>
                  <td>{elem._id}</td>
                  <td>
                    {elem.fname} {elem.lname}
                  </td>
                  <td>{elem.joinDate}</td>
                  <td>{elem.currentStatus}</td>
                  <td>
                    <button>Delete Employee</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <AddEmployeeModal showModal={showModal} setShowModal={setShowModal} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  table {
    border-collapse: collapse;
    width: 100%;
    margin: 10px;
  }

  td,
  th {
    border-bottom: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  tr {
    border-bottom: 1px solid gray;
  }
`;

const Button = styled.button`
  min-width: 100px;
  padding: 16px 32px;
  border-radius: 4px;
  border: none;
  background: #141414;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
`;

export default EmployeeList;
