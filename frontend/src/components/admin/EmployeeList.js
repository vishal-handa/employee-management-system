import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { receieveEmployeeList } from "../../actions";
import Menu from "./Menu";
import AddEmployeeModal from "./AddEmployeeModal";
import moment from "moment";

const EmployeeList = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("/employee-list")
      .then((res) => res.json())
      .then((res) => dispatch(receieveEmployeeList(res.data)));
  }, []);
  const list = useSelector((state) => state.allEmployees.employees);
  // console.log(list);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleArchiveStatus = (user) => {
    fetch("/archive-user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        }
      });
  };

  const handleRetireStatus = (user) => {
    fetch("/retire-user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        }
      });
  };

  return (
    <Wrapper>
      <Menu />
      <Container>
        <Button onClick={openModal}>Add New User</Button>
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Date of Joining (dd/mm/yyyy)</th>
              <th>Employement Status</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th></th>
            </tr>
          </thead>
          {list && (
            <tbody>
              {list.map((elem, index) => {
                return (
                  <tr key={index}>
                    <td>{elem._id}</td>
                    <td>
                      {elem.fname} {elem.lname}
                    </td>
                    <td>
                      {moment(parseInt(elem.joinDate)).format("DD/MM/YYYY")}
                    </td>
                    <td>{elem.currentStatus}</td>
                    <td>{elem.email}</td>
                    <td>{elem.phoneNumber}</td>
                    <td>
                      {elem.currentStatus === "Active" ? (
                        <button onClick={() => handleRetireStatus(elem)}>
                          Retire Employee
                        </button>
                      ) : elem.currentStatus === "Retired" ? (
                        <button onClick={() => handleArchiveStatus(elem)}>
                          Archive Employee
                        </button>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </Container>
      <AddEmployeeModal showModal={showModal} setShowModal={setShowModal} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  table {
    border-collapse: collapse;
    width: inherit;
    padding: 8px;
  }

  td,
  th {
    border-bottom: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
    font-size: 16px;
  }

  tr {
    border-bottom: 1px solid gray;
  }
`;

const Container = styled.div`
  width: inherit;
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
