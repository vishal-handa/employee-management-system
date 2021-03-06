import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { receieveEmployeeList } from "../../actions";
import Menu from "./Menu";
import AddEmployeeModal from "./AddEmployeeModal";
import moment from "moment";
import { useHistory } from "react-router";

const EmployeeList = () => {
  const [showModal, setShowModal] = useState(false);
  const [list, setList] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  //receive the employee list.
  useEffect(() => {
    fetch("/employee-list")
      .then((res) => res.json())
      .then((res) => dispatch(receieveEmployeeList(res.data)));
  }, []);

  //getting the list of employees from the state.
  const temp = useSelector((state) => state.allEmployees.employees);
  // console.log(list);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  //function to archive the user in the database
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
          window.alert(res.message);
        }
      });
  };

  //function to retire an employee in the database.
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
          window.alert(res.message);
        }
      });
  };

  //array methods to sort all users by their current status.
  const activeUsers = temp.filter((el) => el.currentStatus === "Active");
  const retiredUsers = temp.filter((el) => el.currentStatus === "Retired");
  const archivedUsers = temp.filter((el) => el.currentStatus === "Archived");

  //function to go to the employee page
  const handleRowClick = (id) => {
    history.push(`/employee/${id}`);
  };

  //function to set the list state by active users.
  const handleActive = () => {
    return setList(activeUsers);
  };

  //function to set the list state by retired users.
  const handleRetired = () => {
    return setList(retiredUsers);
  };

  //function to set the list state by archived users.
  const handleArchive = () => {
    return setList(archivedUsers);
  };

  return (
    <Wrapper>
      <Menu />
      <Container>
        <Banner>Your Employees</Banner>
        <ButtonContainer>
          <div>
            <Button onClick={handleActive}>Active Employees</Button>
            <Button onClick={handleRetired}>Retired Employees</Button>
            <Button onClick={handleArchive}>Archived Employees</Button>
          </div>
          <Button onClick={openModal}>+Add New User</Button>
        </ButtonContainer>
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
                  <tr
                    key={index}
                    id={elem._id}
                    onClick={() => handleRowClick(elem._id)}
                  >
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
                        <Retire onClick={() => handleRetireStatus(elem)}>
                          Retire Employee
                        </Retire>
                      ) : elem.currentStatus === "Retired" ? (
                        <Archive onClick={() => handleArchiveStatus(elem)}>
                          Archive Employee
                        </Archive>
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
    cursor: pointer;
    &:hover {
      background-color: #f1eeee;
    }
  }
`;

const Banner = styled.p`
  width: 100%;
  color: black;
  padding: 50px 0px 50px 10px;
  font-size: 3em;
  font-weight: 900;
`;

const Container = styled.div`
  width: inherit;
`;

const ButtonContainer = styled.div`
  width: inherit;
  display: flex;
  justify-content: space-between;
  background-color: black;
`;

const Button = styled.button`
  height: 40px;
  background: transparent;
  color: white;
  cursor: pointer;
  padding: 0px 20px 0px 20px;
  &:hover {
    background-color: gray;
  }
`;

const Retire = styled.button`
  background-color: #03783d;
  cursor: pointer;
  padding: 10px;
  color: white;
  &:hover {
    background-color: #044527;
  }
`;

const Archive = styled.button`
  background-color: #e64f5e;
  cursor: pointer;
  padding: 10px;
  color: white;
  &:hover {
    background-color: #800000;
  }
`;

export default EmployeeList;
